export default function About_Me() {  
    return ( 
        <div className="flex flex-col items-center mt-20 min-h-screen font-poppins text-center">
            <h1 className="text-5xl font-bold mb-4">Hi! My Name is Adnan Rashid.</h1> 
            
            <p className="text-2xl text-black mb-4">I am a Full Stack Developer with a passion for creating web applications.</p>

            <p className="text-lg text-black max-w-2xl">
                I am currently working on a project to create a quiz application using Next.js and Tailwind CSS. 
                Feel free to check out my other projects on my GitHub profile.
            </p>   

            <p className="text-lg text-black mt-6">Thank you for visiting my website, have a nice day!</p>

            <div className="text-lg text-black mt-6">
                <p>📞 Phone: +91 962594513</p>
                <p>✉️ Email: adnanrashid230@gmail.com</p>
                <p> Github: <a href="https://github.com/Dakuaisu"> Adnan Rashid</a> </p>
            </div>
        </div>
    );
}
