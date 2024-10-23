"use client";
import { ApiActions } from '@/src/utils/Frontend/ApiActions';
import { Button, Input } from '@nextui-org/react';
import { CaseUpper, SpellCheck } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function CreateBlog() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const idBlog = searchParams.get("id");


  const { get_OneBlog } = ApiActions()

  useEffect(() => {
    if (idBlog) {
      get_OneBlog(idBlog).then((res => {
        // if (res?.success) {
        const data = res.results
        const { title, subtitle, content } = data[0]

        //     setCategoryInput(title)
        setCode(content)
        setTitle(title)
        setSubTitle(subtitle)
        setPreviewBase64(res.image)
        // }
      }))
    }

  }, [])








  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!load) {
      setLoad(true);
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: ['red', '#785412'] }],
      [{ background: ['red', '#785412'] }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  const [code, setCode] = useState('hellllo');

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
  };

  // 

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const wrapperRef = useRef(null);

  const onDragEnter = () => {
    wrapperRef.current.classList.add('ondrag')
  };

  const onDragLeave = () => wrapperRef.current.classList.remove('ondrag');

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    wrapperRef.current.classList.remove('ondrag')

    const files = e.nativeEvent.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setArrayImmages([file]);
        setPreviewBase64(null)
      };

      reader.readAsDataURL(file);
    }
  };


  const [arrayImmages, setArrayImmages] = useState([])
  const [preview, setPreview] = useState(null);
  const [previewBase64, setPreviewBase64] = useState("");

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setArrayImmages([file]);
      setPreviewBase64(null)
    };
    reader.readAsDataURL(file);

  };
  // 
  const { create_Blog, edit_Blog } = ApiActions()
  const createBlog = async () => {

    const formData = new FormData();

    formData.append("content", code);
    if (arrayImmages) {
      formData.append("file", arrayImmages[0]);
    }
    formData.append("title", title);
    formData.append("subtitle", subTitle);

    if (idBlog) {
      const res = await edit_Blog(`/api/blog/${idBlog}`, formData)
      console.log(res)
      if (res) {
        router.push("/dashboard/blogs")
      }
    } else {
      const res = await create_Blog("/api/blog/", formData)
      if (res) {
        router.push("/dashboard/blogs")
      }
    }
  }
  return (
    < >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-10">
        <Input
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          className="labelRight"
          label=" تیتر"
          placeholder=" تیتر را وارد کنید"
          labelPlacement="outside"
          endContent={
            <SpellCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          value={subTitle}
          onChange={(e) => { setSubTitle(e.target.value) }}
          className="labelRight"
          label="توضیح کوتاه"
          placeholder="توضیح کوتاه را وارد کنید"
          labelPlacement="outside"
          endContent={
            <CaseUpper className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <div className="flex items-center justify-center w-full md:col-span-2 xl:col-span-3 2xl:col-span-4  ">
          <label ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#ededed] hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6" style={{ pointerEvents: 'none' }}>
              <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 "> PNG, JPG یا</p>
            </div>
            <input onChange={handleImageChange} value="" id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        {preview &&
          <div className="mt-4 " >
            <img src={preview} alt="Preview" className="max-w-full h-auto aspect-video w-full object-cover border-2 rounded-md border-gray-100 border-solid " />
          </div>
        }
        {previewBase64 &&
          <div className="mt-4 " >
            <img src={`data:image/webp;base64,${previewBase64}`} alt="previewBase64" className="max-w-full h-auto aspect-video w-full object-cover border-2 rounded-md border-gray-100 border-solid " />
          </div>
        }
      </div>

      <div className="ltr">
        {load && (
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
          />
        )}
        <div className='flex justify-end'>

          <Button onClick={createBlog} className={`${idBlog ? "bg-blue-600" : "bg-green-700"}  text-white mt-3`}>
            {idBlog ? "ادیت" : "ساخت"} بلاگ
          </Button>
        </div>

      </div>
    </>
  );
}

export default CreateBlog;
