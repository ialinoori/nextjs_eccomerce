const handleError = (err)=>{
    if(err.response){
        console.log("Error Response" , err.response.data);
        if(err.response.status == 442){
            const errors = [];
            Object.keys(err.response.data.message).map((key)=>{
                err.response.data.message[key].map((e)=>{
                    errors.push(e)
                })
            })
            return errors.join();
        }
        return err.response.data.message

    }else if (err.requset){
        console.log("Erro Request",err.request);
        return err.request

    }else {
        return err.message
    }

    console.log("Error",err.messgae);
    // return "خطای سرور دوباره تلاش کنید"

}

const numberFormat= (number)=>{
    return new Intl.NumberFormat().format(number)

}

export {handleError,numberFormat}