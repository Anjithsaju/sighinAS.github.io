
const wrapper= document.querySelector('.wrapper');
const register= document.querySelector('.register');
const registerlink=document.querySelector('.register-link');
const loginlink=document.querySelector('.login-link');

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
const rbtn=document.getElementById('btn2');
rbtn.addEventListener('click',re);
const user=document.getElementById('user');
    const mail=document.getElementById('mail');
    const pass=document.getElementById('pass')
    let data=[];
    let i=0;
function re(){
    data[i]={
    userid:user.value,
    mailid:mail.value,
    password:pass.value
    }
    console.log(data);
    i=i+1;
    alert("account created");
    f3();
   
}

//sign in
const sbtn=document.getElementById('btn1');
sbtn.addEventListener('click',si);

function si(){
    const user1=(document.getElementById('user1')).value;
    const pass1=(document.getElementById('pass1')).value;
    let j=0;
    let flag=0;
    for(let j=0;j<i;j++)
        {
            if(user1==data[j].userid)
                {
                    console.log("account found");
                    if(pass1==data[j].password)
                        {
                            console.log("succesfull");
                            alert("login succesfull");
                            location.replace('https://anjithsaju.github.io/');
                        }
                    else{console.log("unsuccesfull");
                        alert("wrong password");
                    }
                    flag=1;
                }
            
        }
        if(flag==0)
            {
            console.log("account not found");
            alert(" account not found");
            }

}

//spreadsheet
