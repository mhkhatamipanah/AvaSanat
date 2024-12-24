"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SelectItem, Select, Spinner, Input } from '@nextui-org/react';
import { Button } from "@nextui-org/button";

import getApi from '@/src/utils/Frontend/sendApiToBackend/simpleData/getApi';
// Icon
import { BadgePlus, Pencil, Search, Trash } from 'lucide-react';
// Components
import PaginationComponent from '@/src/components/Dashboard/Pagination/Pagination';
import ModalDelete from '@/src/components/Dashboard/ModalDelete/ModalDelete';
import { ApiActions } from '@/src/utils/Frontend/ApiActions';
import Image from 'next/image';
import img1 from "@/public/images/no-resualt.png";



const Page = () => {



  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [countData, setCountData] = useState(null)
  const [perPage, setPerPage] = useState(24)
  const [page, setPage] = useState(1)




  // ModalDelete
  const { delete_Product } = ApiActions()

  const [idDelete, setIdDelete] = useState(null);
  const [rerender, setRerender] = useState(false);
  const toggleRerender = () => {
    setRerender(!rerender)
  }
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const onModalOpenChange = () => {
    setIsOpen(false);
  };

  const deleteEventHandler = async () => {
    await delete_Product(idDelete).then((res => {
      console.log(res)
      if (res) {
        toggleRerender()
      }
    }))

  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      let data = {
        perPage: perPage,
        page: page,
        q: textSearch
      };
    
      getApi(`/api/product?${new URLSearchParams(data).toString()}`, setData, setLoading);
    }, 300); // دی‌بونس 0.3 ثانیه
  
    return () => clearTimeout(timeout); // پاک‌کردن تایمر در هر تغییر
  }, [page, perPage, rerender, textSearch]);
  




  const LoadingState = () => (
    <div className="w-full h-[600px] flex justify-center items-center">
      <Spinner />
    </div>
  )
  const renderEmptyState = () => (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center mb-16">
        <Image
          className="w-full he-full max-w-[170px] max-h-[170px] sm:max-w-[250px] sm:max-h-[250px]"
          width={500}
          height={500}
          src={img1}
          alt='empty'
        />
        <p> چیزی جهت نمایش وجود ندارد</p>
      </div>
    </div>
  );

  const renderProduct = () => (
    <>
      {data && data.data &&
        <>


          <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-2'>
            {
              data.data.map((e, i) => {

                return (
                  <div className='relative w-full rounded-lg p-3 bg-gray-50 border border-solid border-gray-300' key={i}>
                    <div className='w-full aspect-square overflow-hidden rounded-lg border border-solid border-gray-200' >

                      <Link href={`/dashboard/product/create?id=${e.id}`}>
                        <Image
                          width={500}
                          height={500}
                          className=' aspect-square object-cover w-full h-full cursor-pointer hover:scale-110 transition-all duration-400 ' src=
                          {e?.newArr[0]?.thumbnailBase64 ? `data:image/webp;base64,${e?.newArr[0]?.thumbnailBase64}` : "/images/placeholder.jpg"} alt="" />
                      </Link>
                    </div>

                    <p className='text-right md:text-md text-base vazirDemibold text-gray-800 mt-2 ellipsisOneLine'>{e.title}</p>
                    <p className='text-right text-gray-600 mt-2 mb-4 lg:text-md md:text-sm text-xs ellipsisTwoLine'>{e.subtitle}</p>

                    <div className="flex gap-2 justify-end absolute left-3 -bottom-2">

                      <div className="flex gap-2">
                        <Link href={`/dashboard/product/create?id=${e.id}`}>
                          <Button
                            className="px-0 min-w-8 h-8 bg-blue-50 shadow border border-solid border-blue-100 hover:!bg-blue-200"
                            variant="light"
                            color="primary"
                          >
                            <Pencil className="w-4" size={16} />
                          </Button>
                        </Link>

                        <Button
                          onClick={() => {
                            setIdDelete(e.id)
                            setTitle("محصول")
                            setText(`محصول ${e.title}`)
                            setIsOpen(true)
                          }}
                          className="px-0 min-w-8 h-8 bg-red-50 shadow border border-solid border-red-100 hover:!bg-red-200"
                          color="danger"
                          variant="light"
                        >
                          <Trash className="w-4" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )

              })
            }
          </div>
          <PaginationComponent countData={{ countData: data.countData } } perPage={perPage} page={page} setPage={setPage} />
        </>
      }
    </>
  )

  return (
    <>
      <ModalDelete
        title={title}
        text={text}
        idDelete={idDelete}
        isModalOpen={isOpen}
        showId={false}
        onModalOpenChange={onModalOpenChange}
        deleteEventHandler={deleteEventHandler}
      />
      <div
        className="p-2 lg:p-3 grid grid-cols-1 justify-center w-full gap-4"
        id="container"
      >

        <section
          id="section-1"
          className={`w-full flex flex-col h-full bg-[#ffffff] rounded-lg boxShadow p-4 min-h-[600px]`}
        >

          <div className='flex justify-between items-center mb-3 px-3'>

            <Link href="/dashboard/product/create">
              <Button className='bg-green-700 text-white'>
                محصولات جدید
                <BadgePlus />
              </Button>

            </Link>
            <div className='w-24'>
              <Select
                value={perPage}
                onSelectionChange={(e) => {
                  const values = e.values();
                  setPerPage(values.next().value)
                }}
                variant={"bordered"}
                placeholder=" نمایش"
                className="max-w-xs selectNextUi spanSize"
              >
                <SelectItem value={24} key={24}>
                  24
                </SelectItem>
                <SelectItem value={36} key={36}>
                  36
                </SelectItem>
                <SelectItem value={50} key={50}>
                  50
                </SelectItem>
              </Select>
            </div>
          </div>
          <div className='max-w-[400px] px-[12px] mt-2'>
            <Input
              value={textSearch}
              onChange={(e) => {
                setTextSearch(e.target.value);
              }}
              className="labelInputNextUi borderInput marginControl  mb-4"
              type="text"
              placeholder=" جست و جو..."
              labelPlacement="outside"
              startContent={
                <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          {loading ? LoadingState() :
            data?.data?.length === 0 ? renderEmptyState() : renderProduct()
          }


        </section>
      </div>

    </>
  )
}

export default Page