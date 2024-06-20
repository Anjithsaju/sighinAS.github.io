const data2=require('./index1');
console.log(data2);
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://anjithsaju123:Iameditor2.0@anjithsaju.lzvvo2m.mongodb.net/?retryWrites=true&w=majority&appName=Anjithsaju")
.then(()=>{
    console.log("connected");
   
insertAndFetchData()
})

.catch(()=>{
    console.log("error");

})
const tutSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true
        }
        ,
        password:
        {
            type:String,
            required:true 
        }
        ,
        email:
        {type:String,
            required:true
        }
    }
)

async function insertAndFetchData() {
    try {
        const collection=new mongoose.model('tut',tutSchema)
        data={
            username:"anjana",
            password:"hello",
            email:"123"

        }
        collection.insertMany([data])
     
      // Fetch data
      const fetchedData =await  collection.find();
      console.log("Fetched Data:", fetchedData);
  
  
    } catch (error) {
      console.error("Error during insert and fetch:", error);
    } 
  }
//console.log(datq);
  //  console.log(datq);
console.log("hi");



