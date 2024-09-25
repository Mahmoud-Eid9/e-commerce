import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Profile = (props) => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const user = useSelector((state) => state.orebiReducer.userInfo);
    useEffect(() => {
      setPrevLocation(location.state ? location.state.data : "");
    }, [location]);
    return (
        <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Profile" prevLocation={prevLocation} />
        

<div>
<div className="px-4 sm:px-0">
  <h3 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h3>
  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
</div>
<div className="mt-6 border-t border-gray-100">
  <dl className="divide-y divide-gray-100">
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">First Name</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.first_name}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Last Name</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.last_name}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.address}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone_number}</dd>
    </div>
    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Download
              </a>
            </div>
          </li>
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Download
              </a>
            </div>
          </li>
        </ul>
      </dd>
    </div> */}
  </dl>
</div>
</div>
</div>
    );
}

export default Profile;