
import React from "react";
import Header from "../../widgets/Header";
import Hero from "../../widgets/Hero_O";
import Footer from "../../widgets/Footer";
import JobList from "../../widgets/JobList";
import './Organization_Home.css'

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
let userid = getCookie('userid')

function Individual_Home() {

    return (<div className="container mx-auto p-4">
         <Header />
         <main className="mt-20">
             <Hero />
             <section className="mt-20">
                 <JobList />
             </section>
         </main>
         <Footer />
    </div>
    );
}

export default Individual_Home;