const express = require('express');
const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const os = require('os');

const router = express.Router();

// Promisify file operations
const writeFileAsync = util.promisify(fs.writeFile);
const unlinkAsync = util.promisify(fs.unlink);
const existsAsync = util.promisify(fs.exists);

class ComplexityAnalyzer {
    constructor() {
        this.tempDir = path.join(__dirname, 'temp');
        this.ensureTempDir();
    }

    ensureTempDir() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    async analyzeCode(code, language, input = '') {
        const analysisMethods = {
            'python': this.analyzePython.bind(this),
            'node': this.analyzeJavaScript.bind(this),
            'javascript': this.analyzeJavaScript.bind(this),
            'java': this.analyzeJava.bind(this),
            'cpp': this.analyzeCpp.bind(this),
            'c': this.analyzeC.bind(this)
        };

        const analyzer = analysisMethods[language] || this.analyzeGeneric.bind(this);
        return await analyzer(code, language, input);
    }

    async analyzePython(code, language, input) {
        const tempFile = path.join(this.tempDir, `temp_${Date.now()}.py`);
        
        try {
            await writeFileAsync(tempFile, code);
            
            const startTime = process.hrtime();
            const startMemory = process.memoryUsage();
            
            const result = await this.executeCode('python', [tempFile], input, 30000);
            
            const endTime = process.hrtime(startTime);
            const endMemory = process.memoryUsage();
            
            const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds
            const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;
            
            return {
                language: 'python',
                execution_time: executionTime / 1000, // Convert to seconds
                memory_used_bytes: Math.max(0, memoryUsed),
                memory_peak_bytes: endMemory.heapUsed,
                cpu_time: executionTime / 1000,
                stdout: result.stdout,
                stderr: result.stderr,
                return_code: result.code,
                status: result.code === 0 ? 'success' : 'error'
            };
            
        } catch (error) {
            return {
                language: 'python',
                error: error.message,
                status: 'error'
            };
        } finally {
            await this.cleanupFile(tempFile);
        }
    }

    async analyzeJavaScript(code, language, input) {
        const tempFile = path.join(this.tempDir, `temp_${Date.now()}.js`);
        
        try {
            await writeFileAsync(tempFile, code);
            
            const startTime = process.hrtime();
            const startMemory = process.memoryUsage();
            
            const result = await this.executeCode('node', [tempFile], input, 30000);
            
            const endTime = process.hrtime(startTime);
            const endMemory = process.memoryUsage();
            
            const executionTime = endTime[0] * 1000 + endTime[1] / 1000000;
            const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;
            
            return {
                language: 'javascript',
                execution_time: executionTime / 1000,
                memory_used_bytes: Math.max(0, memoryUsed),
                memory_peak_bytes: endMemory.heapUsed,
                cpu_time: executionTime / 1000,
                stdout: result.stdout,
                stderr: result.stderr,
                return_code: result.code,
                status: result.code === 0 ? 'success' : 'error'
            };
            
        } catch (error) {
            return {
                language: 'javascript',
                error: error.message,
                status: 'error'
            };
        } finally {
            await this.cleanupFile(tempFile);
        }
    }

    async analyzeJava(code, language, input) {
        // Extract class name from Java code
        const classNameMatch = code.match(/class\s+(\w+)/);
        if (!classNameMatch) {
            return {
                language: 'java',
                error: 'No class found in Java code',
                status: 'error'
            };
        }

        const className = classNameMatch[1];
        const javaFile = path.join(this.tempDir, `${className}.java`);
        const classFile = path.join(this.tempDir, `${className}.class`);

        try {
            await writeFileAsync(javaFile, code);

            // Compile Java code
            const compileResult = await this.executeCode('javac', [javaFile], '', 15000);
            
            if (compileResult.code !== 0) {
                return {
                    language: 'java',
                    error: `Compilation failed: ${compileResult.stderr}`,
                    status: 'error'
                };
            }

            const startTime = process.hrtime();
            const startMemory = process.memoryUsage();

            // Execute Java code
            const execResult = await this.executeCode('java', ['-cp', this.tempDir, className], input, 30000);

            const endTime = process.hrtime(startTime);
            const endMemory = process.memoryUsage();

            const executionTime = endTime[0] * 1000 + endTime[1] / 1000000;
            const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;

            return {
                language: 'java',
                execution_time: executionTime / 1000,
                memory_used_bytes: Math.max(0, memoryUsed),
                memory_peak_bytes: endMemory.heapUsed,
                cpu_time: executionTime / 1000,
                stdout: execResult.stdout,
                stderr: execResult.stderr,
                return_code: execResult.code,
                status: execResult.code === 0 ? 'success' : 'error'
            };

        } catch (error) {
            return {
                language: 'java',
                error: error.message,
                status: 'error'
            };
        } finally {
            await this.cleanupFile(javaFile);
            await this.cleanupFile(classFile);
        }
    }

    async analyzeCpp(code, language, input) {
        const tempFile = path.join(this.tempDir, `temp_${Date.now()}`);
        const cppFile = `${tempFile}.cpp`;
        const exeFile = tempFile + (os.platform() === 'win32' ? '.exe' : '');

        try {
            await writeFileAsync(cppFile, code);

            // Compile C++ code
            const compileResult = await this.executeCode('g++', [cppFile, '-o', exeFile], '', 15000);
            
            if (compileResult.code !== 0) {
                return {
                    language: 'cpp',
                    error: `Compilation failed: ${compileResult.stderr}`,
                    status: 'error'
                };
            }

            const startTime = process.hrtime();
            const startMemory = process.memoryUsage();

            // Execute compiled code
            const execResult = await this.executeCode(exeFile, [], input, 30000);

            const endTime = process.hrtime(startTime);
            const endMemory = process.memoryUsage();

            const executionTime = endTime[0] * 1000 + endTime[1] / 1000000;
            const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;

            return {
                language: 'cpp',
                execution_time: executionTime / 1000,
                memory_used_bytes: Math.max(0, memoryUsed),
                memory_peak_bytes: endMemory.heapUsed,
                cpu_time: executionTime / 1000,
                stdout: execResult.stdout,
                stderr: execResult.stderr,
                return_code: execResult.code,
                status: execResult.code === 0 ? 'success' : 'error'
            };

        } catch (error) {
            return {
                language: 'cpp',
                error: error.message,
                status: 'error'
            };
        } finally {
            await this.cleanupFile(cppFile);
            await this.cleanupFile(exeFile);
        }
    }

    async analyzeC(code, language, input) {
        const tempFile = path.join(this.tempDir, `temp_${Date.now()}`);
        const cFile = `${tempFile}.c`;
        const exeFile = tempFile + (os.platform() === 'win32' ? '.exe' : '');

        try {
            await writeFileAsync(cFile, code);

            // Compile C code
            const compileResult = await this.executeCode('gcc', [cFile, '-o', exeFile], '', 15000);
            
            if (compileResult.code !== 0) {
                return {
                    language: 'c',
                    error: `Compilation failed: ${compileResult.stderr}`,
                    status: 'error'
                };
            }

            const startTime = process.hrtime();
            const startMemory = process.memoryUsage();

            // Execute compiled code
            const execResult = await this.executeCode(exeFile, [], input, 30000);

            const endTime = process.hrtime(startTime);
            const endMemory = process.memoryUsage();

            const executionTime = endTime[0] * 1000 + endTime[1] / 1000000;
            const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;

            return {
                language: 'c',
                execution_time: executionTime / 1000,
                memory_used_bytes: Math.max(0, memoryUsed),
                memory_peak_bytes: endMemory.heapUsed,
                cpu_time: executionTime / 1000,
                stdout: execResult.stdout,
                stderr: execResult.stderr,
                return_code: execResult.code,
                status: execResult.code === 0 ? 'success' : 'error'
            };

        } catch (error) {
            return {
                language: 'c',
                error: error.message,
                status: 'error'
            };
        } finally {
            await this.cleanupFile(cFile);
            await this.cleanupFile(exeFile);
        }
    }

    async analyzeGeneric(code, language, input) {
        return {
            language,
            error: `Complexity analysis for ${language} is not yet supported`,
            status: 'unsupported'
        };
    }

    executeCode(command, args, input, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const childProcess = spawn(command, args, {
                stdio: ['pipe', 'pipe', 'pipe'],
                timeout: timeout
            });

            let stdout = '';
            let stderr = '';
            let timeoutId;

            childProcess.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            childProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            childProcess.on('close', (code) => {
                if (timeoutId) clearTimeout(timeoutId);
                resolve({
                    stdout: stdout.trim(),
                    stderr: stderr.trim(),
                    code: code
                });
            });

            childProcess.on('error', (error) => {
                if (timeoutId) clearTimeout(timeoutId);
                reject(error);
            });

            // Set timeout
            timeoutId = setTimeout(() => {
                childProcess.kill();
                reject(new Error('Execution timeout'));
            }, timeout);

            // Send input if provided
            if (input) {
                childProcess.stdin.write(input);
                childProcess.stdin.end();
            }
        });
    }

    async cleanupFile(filePath) {
        try {
            if (await existsAsync(filePath)) {
                await unlinkAsync(filePath);
            }
        } catch (error) {
            console.warn(`Could not delete temporary file: ${filePath}`, error);
        }
    }
}

// Initialize analyzer
const analyzer = new ComplexityAnalyzer();

// Complexity analysis endpoint
router.post('/analyze-complexity', async (req, res) => {
    try {
        const { code, language, input } = req.body;

        if (!code || !language) {
            return res.status(400).json({
                error: 'Code and language are required',
                status: 'error'
            });
        }

        const analysisResult = await analyzer.analyzeCode(code, language, input || '');
        res.json(analysisResult);

    } catch (error) {
        console.error('Complexity analysis error:', error);
        res.status(500).json({
            error: 'Internal server error during analysis',
            status: 'error'
        });
    }
});

// Existing execute endpoint (keep this for backward compatibility)
router.post('/execute', async (req, res) => {
    try {
        const { code, language, input } = req.body;

        if (!code || !language) {
            return res.status(400).json({
                error: 'Code and language are required'
            });
        }

        // Use the analyzer for execution too
        const result = await analyzer.analyzeCode(code, language, input || '');
        
        if (result.error) {
            return res.json({
                error: result.error,
                stderr: result.stderr
            });
        }

        res.json({
            stdout: result.stdout,
            stderr: result.stderr,
            compile_output: result.compile_output
        });

    } catch (error) {
        console.error('Execution error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Cleanup endpoint to remove temporary files
router.post('/cleanup', async (req, res) => {
    try {
        const tempDir = path.join(__dirname, 'temp');
        if (fs.existsSync(tempDir)) {
            const files = fs.readdirSync(tempDir);
            for (const file of files) {
                await unlinkAsync(path.join(tempDir, file));
            }
        }
        res.json({ message: 'Cleanup completed' });
    } catch (error) {
        res.status(500).json({ error: 'Cleanup failed' });
    }
});

module.exports = router;