import React from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MetaTags } from "react-meta-tags";
export default function ReturnPolicy() {

    return (
        <>
         <MetaTags>
    <title> Information on CareNest return policy</title>
      <meta name="description" content=" All returns must be postmarked within seven 7 days of the purchase date." />
      <meta name="keywords" content="carenest" />   
      
   
    </MetaTags>

            <div className="App ">
                <Header />


                <div className="text-black overflow-x-hidden bg-white px-10 pb-10 pt-14 lg:px-40">
                    <h1 className="py-6 text-center text-7xl  font-bold md:py-10  ">
                        <div className=" inline-block  text-[#E94C60]">
                            <strong> RETURN POLICY</strong>
                        </div>
                    </h1>

                    <p className="pl-2 text-2xl  pt-16">Last updated October 31, 2022</p>
                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any
                        reason, you may return it to us for a full refund only. Please see below for more information on our return policy.
                    </p>
                    <h3 className="pl-2 text-4xl font-bold pt-16 pb-10"><strong>RETURNS</strong></h3>
                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        All returns must be postmarked within seven (7) days of the purchase date. All returned items must be in new and unused condition, with all original
                        tags and labels attached.</p>

                    <h3 className="pl-2 text-4xl font-bold pt-16 pb-10"><strong>RETURN PROCESS</strong></h3>
                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        To return an item, please email customer service at contact@carenest.in to obtain a Return Merchandise Authorization (RMA) number. After receiving
                        a MA number, place the item securely in its original packaging, and mail your return to the following address:
                        CareNest Health And Beauty LTD. Attn: Returns
                        RMA#
                        B-122, Mittal Court, Nariman Point. Mumbai, Maharashtra 400021 India
                        You may also use the prepaid shipping label enclosed with your package. Return shipping charges will be paid or reimbursed by us.
                    </p>
                    <h3 className="pl-2 text-4xl font-bold pt-16 pb-10"><strong>REFUNDS</strong></h3>

                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least seven (7) days from the receipt
                        of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card
                        company. We will notify you by email when your return has been processed.
                    </p>


                    <h3 className="pl-2 text-4xl font-bold pt-16 pb-10"><strong>EXCEPTIONS</strong></h3>
                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
                    </p>
                    <h3 className="pl-2 text-4xl font-bold pt-16 pb-10"><strong>QUESTIONS</strong></h3>
                    <p className=" pl-2 text-justify  text-[18px] pt-6">
                        If you have any questions concerning our return policy, please contact us at: contact@carenest.in</p>
                </div>
                <Footer />
            </div>
        </>
    )
}