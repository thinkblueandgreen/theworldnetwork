import React from 'react';
// import "./footer.css";
// import { Row } from 'react-bootstrap';

function Footer() {
    return (
        <div id="footer" style={{backgroundColor: 'grey'}}>

            <div></div>
            <div>
                <div className="row text-center" style={{fontFamily: "'Playfair Display', serif", color: "black", margin: "20px", fontSize: "18px"}}>
                    <div className="col-3">
                    <strong>TWN Membership</strong>
                    </div>
                    <div className="col-3">
                    <strong>Customer Service</strong>
                    </div>
                    <div className="col-3">
                    <strong>Get Us</strong>
                    </div>
                    <div className="col-3">
                    <strong>Ads</strong>
                    </div>
                </div>
            </div>
            <div className="text-center"></div>
            <div className="text-center">The World Network &#169; March 2020</div>


        </div>
    )
}

export default  Footer;