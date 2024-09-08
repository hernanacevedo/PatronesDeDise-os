class ClientComponent{
    constructor(url){
        this.url = url;
    }
    async getData(){
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
    }
}
//decorador
class ClientDecorator{
    constructor(ClientComponent){
        this.ClientComponent= ClientComponent
    }
    async getData(){
        return await this.ClientComponent.getData();
    }
}

//decorador 1

class UpperCaseClientDecorator extends ClientDecorator{
    async getData(){
        const data = await super.getData()
        const newData = data.map(e=>{
            e.title = e.title.toUpperCase();
            return e;
        });
    return newData;
    }

}

// decorato2
class HtmlClientDecorator extends ClientDecorator{
    async getData(){
        const data = await super.getData()
        const newData = data.map(e=>{
            e.title = `<h1>${e.title}</h1>`;
            e.thumbnailUrl =`<img src='${e.thumbnailUrl}'>`
            return e;
        });
    return newData;
    }
}
(async()=>{
    const url ="https://jsonplaceholder.typicode.com/photos";
     const client = new ClientComponent(url)
     const data = await client.getData();
     //console.log(data);

     const upperClient = new UpperCaseClientDecorator(client)
     const data2= await upperClient.getData();
    // console.log(data2);

     const htmlClient = new HtmlClientDecorator(upperClient);
     const data3= await htmlClient.getData();

     divContent1.innerHTML=data3.reduce((ac, e)=>{
            return ac + e.title + e.thumbnailUrl
     },'')
     // console.log(data3);

     const htmlClient2 = new HtmlClientDecorator(client);
     const data4= await htmlClient2.getData();
     divContent2.innerHTML=data4.reduce((ac, e)=>{
            return ac + e.title + e.thumbnailUrl
     },'')
})();