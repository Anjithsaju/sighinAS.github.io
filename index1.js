

const wrapper= document.querySelector('.wrapper');
const register= document.querySelector('.register');
const registerlink=document.querySelector('.register-link');
const loginlink=document.querySelector('.login-link');
const user=document.getElementById('user');
    const mail=document.getElementById('mail');
    const pass=document.getElementById('pass');


let i=0;

//sign in and register transition
registerlink.addEventListener('click',f2);
register.classList.add('active');
function f2()
{
    wrapper.classList.add('active');
    register.classList.remove('active');
}
loginlink.addEventListener('click',f3);
console.log('hello world');
function f3()
{
    wrapper.classList.remove('active');
    register.classList.add('active');
}

//validation
//registeration


   
//sign in
const sbtn=document.getElementById('btn1');
sbtn.addEventListener('click',si);

async function si(){
    const user1=(document.getElementById('user1')).value;
    const pass1=(document.getElementById('pass1')).value;
    try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/signin-odnfwqc/endpoint/fetchuser", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
       
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
if((user1=="userdetails")&& (pass1=="yessekke"))
        alert(data);
        let j=0;
        const keys = Object.keys(data);
const i = keys.length;
        let flag=0;
        for(let j=0;j<i;j++)
            {
                if(user1==data[j].userid)
                    {
                        console.log("account found");
                        flag=1;
                        if(pass1==data[j].password)
                            {
                                console.log("succesfull");
                                
                                location.replace('https://anjithsaju.github.io/');
                            }
                        else{console.log("unsuccesfull");
                            alert("wrong password");
                            break;
                        }
                       
                    }
                
            }
            if(flag==0)
                {
                console.log("account not found");
                alert(" account not found");
                }
        console.log('User registered successfully:');
    } catch (error) {
        console.error('Error registering user:', error);
    }
   

}



async function registerUser1() {
    const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/signin-odnfwqc/endpoint/registeruser';
    const userData = {
        userid:user.value,
        mailid:mail.value,
        password:pass.value
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        const result = await response.json();
        alert("User registered successfully");
        f3();
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

const userData1 = {
    email: "user@example.com",
    password: "yourpassword"
};

// Call the async function

const rbtn=document.getElementById('btn2');
rbtn.addEventListener('click',()=>
{
    console.log("hi");
   // console.log(userData);
        registerUser1();});