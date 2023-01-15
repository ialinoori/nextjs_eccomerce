import axios from 'axios';
import { handleError } from 'lib/helper';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [name,setName] = useState('');
    const [email,setEmail]=useState("");
    const [subject,setSubject]=useState("");
    const [text,setText] = useState("");
    const [loading,setLoading]= useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(name ==="",email==="",subject==="",text===""){
            toast.error("تمامی موارد فرم الزامی است")
            return
        }

        try{
            setLoading(true)
            const res = await axios.post("/contact-us",{
                name,
                email,
                subject,
                text

            })
         toast.success("پیام شما ثبت شد")
         setLoading(false)
        }catch(err){
            toast.error(handleError(err))
            setLoading(false)

        }



    }
    return (
        <form action="" onSubmit={handleSubmit}>
        <div>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" placeholder="نام و نام خانوادگی" />
        </div>
        <div>
            <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="ایمیل" />
        </div>
        <div>
            <input  value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" className="form-control" placeholder="موضوع پیام" />
        </div>
        <div>
            <textarea  value={text} onChange={(e)=>setText(e.target.value)} rows="10" style={{height: "100px"}} className="form-control"
                placeholder="متن پیام"></textarea>
        </div>
        <div className="btn_box">
            <button type='submit' disabled={loading}>
                ارسال پیام
                {loading && <div className='spinner-border spinner-border-sm ms-2'></div>}
            </button>
        </div>
    </form>
    );
};

export default ContactForm;