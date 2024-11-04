const wrapper = document.querySelector(".wrapper");
const register = document.querySelector(".register");
const registerlink = document.querySelector(".register-link");
const loginlink = document.querySelector(".login-link");
const user = document.getElementById("user");
const mail = document.getElementById("mail");
const pass = document.getElementById("pass");

let i = 0;

//sign in and register transition
registerlink.addEventListener("click", f2);
register.classList.add("active");
function f2() {
  wrapper.classList.add("active");
  register.classList.remove("active");
}
loginlink.addEventListener("click", f3);
console.log("hello world");
function f3() {
  wrapper.classList.remove("active");
  register.classList.add("active");
}

//validation
//registeration

//sign in
//const sbtn=document.getElementById('btn1');
//sbtn.addEventListener('click',si);
//"https://ap-south-1.aws.data.mongodb-api.com/app/signin-odnfwqc/endpoint/fetchuser"
async function si() {
  const user1 = document.getElementById("user1").value;
  const pass1 = document.getElementById("pass1").value;

  try {
    const response = await fetch("http://localhost:3000/fetchUserByName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user1, password: pass1 }),
    });

    const isValidUser = await response.json(); // Directly get the boolean value
    console.log(isValidUser);
    if (isValidUser) {
      console.log("Login successful");
      alert("Login successful");
      location.replace("https://anjithsaju.github.io/");
    } else {
      console.log("Login failed - user not found or incorrect password");
      alert("User not found or password incorrect");
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    alert("An error occurred. Please try again.");
  }
}

async function registerUser1() {
  const url = "http://localhost:3000/insert";
  const userData = {
    userid: user.value,
    mailid: mail.value,
    password: pass.value,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const result = await response.json();
    alert("User registered successfully");
    f3();
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

const userData1 = {
  email: "user@example.com",
  password: "yourpassword",
};

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  si();

  this.reset();
});
document.getElementById("myForm2").addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("hello");
  registerUser1();

  this.reset();
});
