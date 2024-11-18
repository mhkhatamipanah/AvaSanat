import AboutUs from '@/src/components/Main/About-Us/AboutUs'
import React from 'react'
export const metadata = {
  title: 'درباره ما | آواصنعت - پیشرو در اتوماسیون صنعتی',
  description: 'آواصنعت، پیشرو در واردات و توزیع قطعات اتوماسیون صنعتی و ابزار دقیق، با ارائه محصولات برتر از برندهای جهانی و خدمات حرفه‌ای در کنار شماست.',
  keywords: 'آواصنعت, اتوماسیون صنعتی, ابزار دقیق, تأمین قطعات, مشاوره صنعتی, خدمات پس از فروش',
  openGraph: {
    title: 'درباره ما | آواصنعت - پیشرو در اتوماسیون صنعتی',
    description: 'اطلاعات کامل درباره آواصنعت، پیشرو در واردات و توزیع قطعات اتوماسیون صنعتی و ابزار دقیق با خدمات حرفه‌ای و محصولات برتر.',
    image: '/images/4.png', // از مسیری که برای تصویر دارید استفاده کنید
    // url: 'https://example.com/about-us' // URL صفحه درباره ما
  }
};

const Page = () => {
  return (
    <>
    <AboutUs/>
    </>
  )
}

export default Page