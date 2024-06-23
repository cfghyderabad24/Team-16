import React from 'react';
// import Image from 'next/image';
// import AlertImage from '../../public/alert.png';

const alerts = [
  {
    title: 'Visit Reminder',
    description: 'Reminder to visit the project site',
    projectId: '60d21b4667d0d8992e610c85', // Dummy Project ID
    sentDate: '12/09/1982',
    respondedDate: null, // No response yet
    empType: 'Frontliner', // Assume this alert is for a Frontliner
    empId: '60d21b4967d0d8992e610c86', // Dummy Frontliner's ID
    type: 'visitReminder',
    currentAlertsCount: 1,
  },
  {
    title: 'Upload Reminder',
    description: 'Reminder to upload project documents',
    projectId: '60d21b4667d0d8992e610c85', // Dummy Project ID
    sentDate: '19/09/1982',
    respondedDate: null, // No response yet
    empType: 'HigherEmp', // Assume this alert is for a HigherEmp
    empId: '60d21b4967d0d8992e610c87', // Dummy HigherEmp's ID
    type: 'uploadReminder',
    currentAlertsCount: 1,
  },
  {
    title: 'Approval Required',
    description: 'Approval needed for project milestone',
    projectId: '60d21b4667d0d8992e610c85', // Dummy Project ID
    sentDate: new Date().toString(),
    respondedDate: null, // No response yet
    empType: 'HigherEmp', // Assume this alert is for a HigherEmp
    empId: '60d21b4967d0d8992e610c87', // Dummy HigherEmp's ID
    type: 'approve',
    currentAlertsCount: 1,
  },
  // Add more dummy alerts as needed
];

const AlertsList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Escalation</h1>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-yellow-100 rounded-lg shadow-md p-4 flex items-center">
            <div>
              <h2 className="text-xl text-red-600 font-semibold">{alert.title}</h2>
              <p className="text-gray-600">{alert.description}</p>
              <p className="text-gray-600">Project ID: {alert.projectId}</p>
              <p className="text-gray-600">Sent Date: {alert.sentDate.toString()}</p>
              <p className="text-gray-600">Emp ID: {alert.empId}</p>
              <p className="text-gray-600">Type: {alert.type}</p>
              <p className="text-gray-600">
                Responded Date: {alert.respondedDate ? alert.respondedDate.toString() : 'Not responded'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;
