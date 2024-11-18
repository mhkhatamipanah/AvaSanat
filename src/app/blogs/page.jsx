import AllBlogs from '@/src/components/Main/AllBlogs/AllBlogs'
import React from 'react'


export const metadata = {
  title: "مقالات آوا صنعت | مطالب آموزشی و تخصصی",
  description: "مطالعه مقالات تخصصی و آموزشی آوا صنعت در حوزه‌های ابزار دقیق، اتوماسیون صنعتی و قطعات صنعتی. اطلاعات مفید برای علاقه‌مندان و متخصصین صنعت.",
  keywords: "مقالات, بلاگ آوا صنعت, آموزش, ابزار دقیق, اتوماسیون صنعتی, قطعات صنعتی, تخصصی",
  openGraph: {
    title: "مقالات آوا صنعت",
    description: "مروری بر تمامی مقالات تخصصی و آموزشی آوا صنعت در زمینه‌های مختلف صنعتی و فنی.",
  },
  
};

const Page = () => {
  return (
    <>
    <AllBlogs/>
    </>
  )
}

export default Page