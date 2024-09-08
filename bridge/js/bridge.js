class EncoderTextabstraction{
    constructor(encoder){
        this.encoder= encoder
    }
    encode(str){
        return this.encoder.encode(str);
    }
    decode(str){
        return this.encoder.decode(str);
    }
}

class Base64EncoderImplementor {
    encode(str) {
      return window.btoa(decodeURI(encodeURIComponent(str)));
    }
   
    decode(str) {
      return decodeURIComponent(decodeURI(window.atob(str)));
    }
  }

  class HTMLEncoderImplementor{
    encode(str){
        return str.split(".").reduce((ac,e)=>{
            return ac + `<p>${e.trim()}</p>`
        }, " ");
    }
    decode(str){
        return str.split("</p>").reduce((ac,e)=>{
            return e!== "" ?
             ac + e.replace("<p>","") + ". " :
             ac + "";
        }, "");
    }

    }


  const encoder1= new EncoderTextabstraction(new Base64EncoderImplementor())
  console.log(encoder1.encode("pato"));
  console.log(encoder1.decode("cGF0bw=="))

  const encoder2= new EncoderTextabstraction(new HTMLEncoderImplementor())
  console.log(encoder2.encode("Esto es un texto. Y aqui comienza otro. Y aqui otro mas"));
  console.log(encoder2.decode("<p>Esto es un texto</p><p>Y aqui comienza otro</p><p>Y aqui otro mas</p>"))


