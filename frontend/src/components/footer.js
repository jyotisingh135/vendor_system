import React from 'react';

class Footer extends React.Component{
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                {/* Google Map */}
                <div id="googleMap" className="w3-grayscale" >
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1310192796414!2d72.75760081477885!3d21.147183589101182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d806232a989%3A0xf791a1e083b2bca3!2sLa+Net+Team+Software+Solutions+Pvt.+LTD.!5e0!3m2!1sen!2sin!4v1520685048603" width="1650" height="450" frameborder="0" allowfullscreen>
                    </iframe>
                </div>

                {/* Footer Section */}
                <footer className="w3-center w3-black w3-padding-16">
                    <p>@CopyRight <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" className="w3-hover-text-green">w3.css</a></p>
                </footer>
            </div>
        )
    }
}

export default Footer
