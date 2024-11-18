// pages/contact.js
import ContactUs from '@/src/components/Main/Contact-Us/Contact-Us'; 
import React from 'react';

export const metadata = {
  title: 'تماس با ما',
  description: 'برای ارتباط با تیم حرفه‌ای ما، اطلاعات تماس یا فرم تماس را مشاهده کنید.',
  keywords: 'تماس, ارتباط, پشتیبانی',
  openGraph: {
    title: 'تماس با ما',
    description: 'برای ارتباط با تیم حرفه‌ای ما، اطلاعات تماس یا فرم تماس را مشاهده کنید.'
  }
};


const Page = () => {
  return (
    <>
      <ContactUs /> {/* کامپوننت تماس با ما */}
    </>
  );
};

export default Page;
