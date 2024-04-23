import React, { PropsWithChildren } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




const TextArea  = ({ name, control, children }) => {

    return (
        <div className="mt-6 mb-10 max-w-[40vw]">
            <label htmlFor={name} className="block text-gray-600  -5">
                {children}
            </label>

            <div style={{ marginBottom: "60px" }} className="flex justify-center items-center space-x-4 mb-10 min-h-[30vh] min-w-[30vh] ">

                <Controller
                    name={name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <ReactQuill theme="snow"  {...field}


                        modules={{
                            toolbar: [
                                [{ 'header': [2, false] }],
                                // [{ size: [] }],
                                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],

                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],

                                ['clean'],
                                [{ 'color': [] }, { 'background': [] }],
                                [
                                    { 'list': 'ordered' },
                                    { 'list': 'bullet' },
                                    { 'indent': '-1' },
                                    { 'indent': '+1' },
                                ],
                            ],


                        }}
                        formats={[
                            'header', 'font', 'size', 'color',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet', 'indent',
                            'align',
                        ]}
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            height: '300px',
                        }}

                    />
                    }
                />

            </div>


        </div>
    )
}

export default TextArea