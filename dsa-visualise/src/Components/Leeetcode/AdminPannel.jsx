import React from 'react';
import { Plus, Edit, Trash2, Home, Code ,User} from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform',
      icon: Plus,
      color: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-white',
      route: '/problem/create'
    },
    {
      id: 'manage',
      title: 'Manage Problems',
      description: 'Edit or delete existing problems',
      icon: Edit,
      color: 'bg-blue-500 hover:bg-blue-600',
      iconColor: 'text-white',
      route: '/problem/detail'},
       {
      id: 'manage',
      title: 'Manage User',
      description: 'Details of user shown here',
      icon: User,
      color: 'bg-pink-500 hover:bg-pink-600',
      iconColor: 'text-white',
      route: '/user_details'}
    // },
    // {
    //   id: 'delete',
    //   title: 'Delete Problem',
    //   description: 'Remove problems from the platform',
    //   icon: Trash2,
    //   color: 'bg-red-500 hover:bg-red-600',
    //   iconColor: 'text-white',
    //   route: '/problem/manage'
    // }
  ];

  return (
    <div className="min-h-screen mt-22 bg-gray-50">
      {/* Navigation */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CodePulse Admin</span>
            </div>
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Manage coding problems on your platform
          </p>
        </div>

        {/* Admin Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <NavLink
                key={option.id}
                to={option.route}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-gray-200">
                  <div className="p-8 text-center h-full flex flex-col">
                    {/* Icon */}
                    <div className="bg-gray-100 p-4 rounded-full mb-6 group-hover:bg-gray-200 transition-colors duration-300 inline-flex mx-auto">
                      <IconComponent size={32} className="text-gray-700" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {option.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 flex-grow">
                      {option.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="mt-auto">
                      <button className={`${option.color} text-white px-6 py-3 rounded-lg font-medium w-full transition-colors duration-300 flex items-center justify-center space-x-2`}>
                        <IconComponent size={20} className={option.iconColor} />
                        <span>{option.title}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Stats */}
        {/* <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Problems</div>
                  <div className="text-2xl font-bold text-blue-600">25</div>
                  <div className="text-xs text-gray-500">Active coding challenges</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Month</div>
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-xs text-gray-500">New problems added</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Edit className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Updated</div>
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-xs text-gray-500">Problems modified</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Admin;