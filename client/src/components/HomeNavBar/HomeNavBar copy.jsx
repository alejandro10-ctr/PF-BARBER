import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Navbar, Container, Nav } from "react-bootstrap";
import { CartContext } from "../Shopping/ShoppingCart";
import SearchBar from '../SearchBar/SearchBar';
import styles from "../HomeNavBar/HomeNavBar.module.css";

export default function HomeNavBar({ user }) {
    const { userId, myUser, cartItems, SignOff } = useContext(CartContext)
    const location = useLocation();
    const cookies = new Cookies()
    const token = cookies.get("token");
    let tokem = ''
    if (token) {
        tokem = jwt_decode(token);
    }



    // const tokenDecode = jwt_decode(token);
    // const isAdmin = tokenDecode.isAdmin


    if (!!userId &&!Object.keys(myUser).length) {
        return <h1>Cargando...</h1>
    }
    else {

        return (


            <div>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <nav className="navbar navbar-expand-lg navbar-red bg-red">
                    <div className="container-fluid" >

                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3 me-lg-0">
                            <Navbar.Brand>
                                <Link to="/">
                 <img className={styles.removebg} height="80px" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGCBEVExcVEhMXGBcYGRgZGRgaExkXGxkZGBkZHBwXGRoaHislGh0oHxcbJDUkKywuMjIyGSE3PDcwOysxMi4BCwsLDg4PHBEQHDsoICgxOzw5MDs7Mjk7NDc7OTo4LjE8Ozs6Ozs7OjE7Oy47MTs5MzsxMzE7OzkuLjE7MS4uMP/AABEIALIBGwMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMCCAH/xABQEAACAQMCAwQECAgIDQUAAAABAgMABBEFEgYhMQcTQVEiYXGBFDJCUnKRobEIIyQzYpKiwVNjc5Oy0dLhFRY0NUNUZHSDlLPC0xdFgrTD/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAIDBAUB/8QAJBEBAAICAQMDBQAAAAAAAAAAAAECAxEhEhNxBCIxBRRhwfD/2gAMAwEAAhEDEQA/ANmpSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApX8JqJXiKxMixi6h3tyVe9XLHphefpH1Cgl6UpQKUpQKUpQKUpQKUpQKUpQKUpQKgOL+JYbGJXlDMzttjjTG5268skAAeJPq8SBU/Ve414Wt7+Hu5hh1yY5B8aNiOf0lOBlTyOB0IBAePCnGVpeEohaOZfjQSjZIPWB0YY58j0IyBVnr8z6/pV1YTLDdK2FO6GVCRgDo8EnVcciUPQ+RIatE4C7RfiQ6g6nd6Md18VWPzJh/o36c+n2MwapSv4DX9oFKUoFKUoFKUoFKjNQ16yh/PXUMfqeZFP1E5qEu+0bSE63Yb6EUj/aqEUFupVCk7WNJHRpm9kDD+livP/wBXNM+ZcfzS/wBug0GlUKPtY0k9WmX2wMf6Oa77XtG0h+l2F+nFKn2sgFBbqVF6bxBYzkLBdQyMfkpMjN+qDmpSgqHaZdskKqBlWWd3Q5xKIIJJRCcdVZkXcPFQw6E1+fbqZ5GLysXZvjM3PP8AUPV0HhX6b4k02OeHDv3ZjPepKMfi3UH0/S5FcFgwPIqzA9a/N/dwSXKopWKN5VRnBJjVWcKZEDc1THpBSxwPGg3Lsc1KWfTkMxLNG7xBicllXBUk+JAbbn9GrpUXw3pMVpbxwQ52IOROCWJ5lmI5Ekkn31KUClKUClKUClKUClKUClKUClKUClZlqvassE7RyWMvdhmCSd4AZAjFSwVlAxlT8onzweVe9v2vac3x4rhfbGjD9mQ0F11zSYLqJoriMOjeB6g+DKRzVh4EViHHHAFzYl5YczWx6tjLIPKVR1A+eP2a0aPtU0g9ZZB7beT9wNfR7UtH/hpP+Xl/s0FB7N+0CS0CxXW97TIVHwWaHPRQflp+j1A6cuVbdaXEciK8bB0YBlZSCrA9CCOorNv8eeHo45I44GMcpJlRbXark9SwbGf3VCcIcY2lpK0NhHeSpK+I4JpIEjR2PLbIWJUHxz7Tk86DZplcj0GUH9JS33MK4ZzfD4gt2+kZE+4NUbwDxOdQheUwGIpIYyN+9SQAcq4UbuuDy61ZaDNtU401SNr1Bb22bJY3kO+RgyygEFOS9BknOOhr+R63rkl1Fbb7SMzW3wkOsEjbFzjY26T4wOOfTnUrxBp9ukd211PHCLyWPvGeQLiCIKojXmCWZEbp0Mp67edZ13tHsIrl57WN55O6WFSw7mNEV2dsFhvJYlc+iB6C86Dit9T1q4trK4N+6i8uhB3ccESFF3ODIHC5bAjY/vqN4js443vI77Up3ZWjW2HfmdnByZGkiVsLywAGKDOa57F9bvokhtYnjtlUKiRgwwhfXK53SdefpNnyqy8O9joGGvZ/+HCMD2GRhkj2KPbQZ7dahZIV+C2SA7VTdM7S72xzk7rOxGJ+TlwOWK6tN4O1S6O6O0cA/KeNLdPaFYKMfRFb5oXDFhaD8nt40b5+Nzn2yNlj9dUntB7Rbuyna3S0RcAMkkkhcSIcgOETGBlWGC2eVBXrDsgvm/OzwR+pQ8h9/JR9tS0PYyuPTviT+jbgffIalX0nXLq2E41QRtJGsiQx24jXLLuCGXdvGcgZ54qW7NreZ9LRL1Zd798sizGQSFXkcAMX9LmpGD5UFTl7HoR01Aj6UKn/ALxXHcdjk+MxXsb/AEoWT7VdvuqoaZo8B1gW0ibovhckRUk5KLI6AFgc55DnnNWXtE0ptHngk02WSFJRITH3jOgaMpyKsTvUh+jZ6Gg8bfsm1TvFBkgRcg94srsUwfjKNgJYdR05+IrZOIbmaK1mkgjMsqRsyJgkswHIYXm3sHM9BXjwXrHwuzhuCApdfSUdA6kq4Hq3Kceqpk0H5/4g4l1m7iMNxauYyQSEtbhMkdAdrekPUcjkPKqudJuv9Wn/AOXl/s1c9SGqTz3rx39wixTOFjSaXmpnaNVVUYBcY8vCujS+FuIZsH4bcxqflSXU6/shy32Co7hdOC8V6p4jzCP4f4o1y0hWCK3kdFPoCSzmcgHogIx6PkPDPLljG7WLu0aNIuxyqlkznaxAJXPjg8vdWb6Rw3q1peWsk2oy3ELSFJEM0pADRvtJSRiGG4D1g492oVJSUpSgUpSgUpSgUpSgUpSgUpSggtR4XtJSzFXUuSzBJXRHY9WeMHY7HzZSaquo9ktk5JWeVPUEgAH6sS/fWg3MCOpV1DKeoNUzV7fhsSMlx8DEinDK8ihlPkRnINBV7vslgX/3MJ9OJD/+i1wSdnumx/ndbhHuiU/bKatltp3CkjBE+BFjyA74Ak+Qy3Op2PgLSB0sYvepP3mgzL/F/hqLnLqkknqjAYH+biY/bXpHrPClv+atJLhv4xSwPumcD9mtQXhHSkGfgFtgc8mCM4x48xURwvxVpc938FsolGI2cSLCsaNtKgogwGPI5zgDl40FI0TjG9jeRdM0+VoHO6ON45JFhc/G2GMALGeR2ZwDnBA5V3Sw8W3nIn4Mh8njhH1qXlFa/WP9rnEWqWt0I4rrZFIm+NY41DAD0WDMVJzkE5B8aD00/sfd233t6zMevdqWY/8AFkJJ/Vq6aFwHpdtgx2yu4575fxrZ8xu5KfogVn+t8MTHSk1EX928piimdZLhimHClwmOa43EjmemKl+wjXLmYXEM8jyLEI2RnYuy7y4KFjzI9AEZ6c6B2mce39nObeGBIxgMkrnvC6Ec2RBgJhsj0s/F6c6iuI+H7yXTF1F9RuJJDFHM8TNsjCOFLBFTAUqGznHPHQZ5eX4Qi/lVsfOJ/sf++vnWOM7ZtKttOilUSPDDHPIyuUhVFXcpCqWdjtxhQcc84oJ3sF1a5lS4jmkeRI+6MbOxYqX7zcgZuZHoKceGfXUB+EEn5bCfODH1SP8A2qvvZX/g1LburCdZip3Stgo7O3LcyMAyjlgcui9TVJ/CGX8otT5xSD6nX+uglbbj+OKDTLe2aKSVxaxzg7m7pSI0YciMSZJ5c8bTkVqlUHhXheyutP095YgHjSOUMmEYuAM7iBlgWAJ9YFWjS9dt55p4YXLSW5VZfRIAZtwwCRg80IOPKgwbV5Gh1uR0Quy328IMAuTMG2DPQtnHvqa168m1q+jgkMdl3W5FjlZjIWcjfgbQGf0VwmRy6E5qL4w9DXZD5XcDfWYm/fU9296OY7iG7jyolHduw5YkTmjZ+cV8f4oUGscOaTHaW0dvHkrGuMnqxJJZjjxJJPvqSqE4I1j4XZQz/KZAH9Ui+i4/WB9xFTdBTdM1qytobhxtLxzTNKI0BfL3MiruPIE5I6nlVe1XtKmbIt4FjHznO5v1RgA+8166PwrcTLf5KxpcTv3bE7uUd1IxJUH1Y6ipXT+ALGEbp3aTHMl22IPcuOXtJrXj7FI3fmWa/fyTqvCocN63dXGo2vfTO47zO3OFHoPz2LhffitnqnLquniWC2tCm4zLyjTC+irE5YDBPLzNXGqMuSt7brGoX1w3xRq/zPPL6pSlVpFKUoFKUoFKUoFKUoFKUoFYF27QImpZRQu+CN2wMbn3yruPmcKoz6hW+1g/b7/nJP8Adov+rNQTfHnClmNHjuY4UjljigdmRQneB+7Vg4Awx9Ldnrkes1IdgepzS280MhLLCyCMnntVw34sHyUrkDw346YqtcUcTy3Nrb2LRNZxMkQee5SRVcRhSNgVTlcqGznngdBzrTez7RLa0tES2kWVW9NplIIlY8tw2kgAAAAZOAPE5NBI8U6gLe0nm/g4nYetgp2j3nAr86cCah8GvrWUnAWRFb6Eg7tifVtfPurX+3a+Mend2uS00saADqQpMh+2MD31nna5w8LSS2Cj0XtY4yfOSABGJ9qslB+g6xP8IQflVt/JP9j/AN9alwVqnwqxt585Z413/wAovouP11asx/CGX8otT/FSj6nT+ug9dS4lhk0i2062YS3MsMMbKGAWIKqlw7sQqthSuM5Gefru/ZtwsLC3KswaWQh5WX4ucYCJ4lVGefiSTyzgZnxZw3D/AIGsryGJFcJGs5VQO8EgADvj4zB9oz19M1cOwnWjLaNbu2Wt2G3Jye6fJUewMHX1ALQQP4Q6/jrQ/wAXMPqaP+urTw9ZwScPoJVTYbRi52gYKqx35+cCM58xVW7f3ElxaRR+nIElzGoLPh2j2+ivPntb6jXfoOhatdWMNlMBZ2qrtkJ9KeZck7QnSJeeCDz5cwQSKCB7AbORr15QCESFlc+G6RkKp+wT7vXXf26nv7u3hgR5ZYkkMiRxs5USFCmdoPUKx+rzrUdA0i3s4RFAoSNckknJYnq7sepPn+4VFaxx5pVuSHuUd+hWIGU5HgdmQDy8SKCt8Lz68lnFbQaekXdoEE1xMB4nmIl9IYB8f7qlOzDg+5sGnkuJo5Hn2Ftm44ZTISxZgNxJkPgKhNQ7ZIBnuLSV/XJIkY9uE3moK67ZL0/m4bZPpGRz/SX7qCz6h2VLNM881/K0kjbmZYkXnyxjrjAAA9gq08Q8Mrd2QtJpXYgR4mIUvvQj0yOhJwQfUxrJD2van/sv80//AJa9Iu2DUgea2reru5B90tBpPAXCc2nmRPhfewv6QjMIQpJyBcNvPIqMEY8AfPNvNYza9ss4x3tnGw8dkzJy9QZW++tZ0XUEuII50BCyorqGGCAwBwcePOgoA4nuFivUi2p3ErhHA3MS93IGJ3cuh8qqha6un/0s5z+k2D7Oi/ZWjaNpFlFFPNPt2yzTGQyMNnoXMm0YPIc8e+vG+490+AbLdGkx0CKFQf8AybH2A1DsXyTw6uL6rg9LWeikdXHM+I/aB4b4Xuobi3nmVUAlUbS2W9JXHRcgdfOtUrLtN4zuLu9toiiJGZc7Rlm5I5GWPs8AK1HNWzhnD7ZYM/rbert3LeH1SlKipKUpQKUpQKUpQK/hNcOvakltbyTyfFiRnIHU4HJR6ycD31SdK4Um1FBc6tLKRIN0dpHIY4okbmoYLzZ8HmeR54OfANDBB6V9VQp+z9YB3mlXEttKvNUMrSQyEfJkRycg9M+HXBqV4B4nF7C3eKI7iFjHPHn4rgkbh+iSp9hBGTjNBaKwbt+/zkv+6x/9Sat5rHO0vhDVb29aWOBe7VVjjImQFkUsQzBiMEl25eHKgtPFttHJoB7wD0LSN1J8HSNWUj15GPeR41Vvwe7uXvLmHJMYVHx4K5YrkeW4dfoV3X2h6/eW6Wkq29tAqxoxEhd3EYAG7bnIyoO0benWrlwNwtDp8JjjJZ3IaSQjBdgOWB8lRk4XJxk8ySTQU3tUilvNTsbKGTY6q0u4ruCMSWVivjgQHkfnDzqN7SeEb5LQ3NzqD3RiZfQMIjVVkYIWGGPmPAcqn4ODdUOpfD3u4VbdjasbP+J6d2AwGPRHXrnnmrXxjw+L6EQtPJEm4FxHty4HRWLA8s4PuoKd2Aanutpbdjzik3qP0JR/bV/1hUD+EFdRtcW0aupdEk3rnmu9o9mfInaTirxoHAWm2Mi3Cs+9M4kkmwBuBByF2qeRPUV9ahxToUErStLbtM2NzxIJZG2gABmjUnkABzNBy8BQreaMLWWKSMCJoGLxldx28pUz8ZfSBB81PlUb2ednNzZzrcTXQDAYMcO7a4+a7tjcvQ429QOdeOpdr8ZOyytJJW8C52+8IgZmH1VX9V1biK7iSVi0NvI8aIYyIVYysqpghjKVJYc84xQalrmt6ZZO0k8kSSsBuwA0zADAG1QXI+yqDr/a67HZYW3MnCvL6TE/oxIeZ8st7q4LHs2CX8FvcS96JIpZptgMfJCqhQxJLZdxk8uX11aOzvQoYr3UZoYgEicW8KDJK7EVpMFiTljs5+2gpVxouu3w7y+mMMR57rmUQRAHyiA6+1R7andK7MrBLdria7e4jRWci32KhCAkhSCxY8vBhVb0a9tr6W5fVpQbk8reOaaSCCNjkMu5Ae7K+j6J6455JJGlcEcMfAdOmjeZZTKryMyfE5x7cJ5jC9fHyoK5w1PoskF3LaaWHFpH3pNwQ5k5O2FLGTHKMn6uVWHst18XyzMLOGBI2RVEeDksCTk7V6Db4eNZhwHxC1tZ3cQtZZu/TazoDsjXu2UlyFPTeT7Kvn4PK/klwf8AaMfVFH/XQeF/xzqVxdzW+l2sbiEuGMgBLbG2luciKoLAgDmT15c8SvZ7xLHqPfQ3VrGs8WN47sFGGSp9FslSGGCCT1HPygOxc51PUD65PtnenY7/AJ21D2y//YNBxarrtml5LbnQIJnjldfxY9JlU8nMawnOVwcdOdX7gfja1vi0UaPFLGMmJwB6KkKShHLAJAI5EeVUCTU4bTiSead9kQZgzbWbBe3THJQT1PlXrwDeJccQzTwZMbrK+dpX0SEXcQemWHjz50CCOSQaqiK0j9+AqqCx/wAtc4AHh416aT2f30mDIFhX9M7m/VT95FdMHaTHZSXFvLaOWjubjDIVXcrTSMCwbGDhuvPIwajNU7WbiTIijEQ8+Tt9Z5fs1p+7vSuqR/aVV9JXJb3TryuOn8FwWkkEvePJIJVAJwqjcGBwo9XmTV7NYTwZr811qdqGaRjvYks5bAEcnReij6q3bFZ5yWvO7/LRfDjxT00ncfh9UpSvEClKUClKUClKUFf7QNMe50+5hj5u8Z2jzZCHC+8rj318cDcRwXlujIwEqKFmiPJ43UYIKnnjIOD+/Iqx1m3ahwSZAbvT0ZLpTlxG/dmVTyLDBGJByORjcMg5OKC8a5rFvaxNLcSKiDxJ5k/NUdWb1CsS0mw1ae8e+0y3kiWSR5Fd3VVdZGLHfvIEisTnCggcsdN1aLwrwDbRiOa73XVyFBZ5pDKqPyJVFYkYB6E5PLNXgCgoEut8RxKO80yCXA5mK4A/YZi31ZqCvO1y6hbZPpndv815njPtAaLJHrrQOKeKbOyTdcSgMRlY19KR/or5es4HrrKNU7UZbmUp8Cgltzy7iRTJIw+duGQrexTj19aDsl7Zbj5NnEPbM7fcgrnftT1dkeSO2hESEBpBBK6oW6Bn7zaCeXXzHnXrFwFBqEYn08yWh3FZILiNyFbrmNupXnnxHP5OMVJWXZrqUdvJarqMawysGdBATkjHiTkZ2rkA89vtoKpcdp2rP/pkj/k7dCR7N+a5X4tuJP8AKNTvwPERQRR/ak6/dVti7GJPlX6+62P3mWuyLsZg+XeSn6MSL95agoqzaI7Brh9VlPm3wf7y7N9tT2natwtFg/ArhsfwoEgPtVpSv2VaYOx7Tx8aa5b1b41H2RZ+2pGDss0hesMj/SuJf+1hQQ2ldoehwb+5hkjEhBKrboqjCqnIK2AMKOVeZ4/0MW8NtumCQmApmHJ/J3Rkzz5/mwD7TVvt+BNJTpZRH6amT+mTUrZ6NaRfmreFMfMhRfuFBTLXjrTJrlLiJbl3WKSL0LWR8q7xv8kHoY/tq0QxC2huZo0Z95kuRGAVdmManZzHJiUx08RU0BX9oMZ1DibRtRtbiW6higuFDCLDbpnITKMHVBuG842nIGDnka6+zKSWLQrx5dwjAnaLPTb3Qzs/RL7vfnzrRrjh+xd98lpA79d7QRs2fPcVzXdJboU2MilcY2lQVwPDaeWKDFOza7VNG1XmMhG8f4SEov2irH+DzKDaXCg8xPn3NFGB/RNaCumW4BUQxhWxuURqA2Dkbhjng869bWzijz3UaJnGdiKucdM4HPqfroMT4D12307Ub74bvjLMyjEbMQRKzcwozghgQehFSvYcGkvb24VT3T7sMRy3PKzhc/OC9R4ZHmK1DUtGtJyDcW8MpHQyRI+PZuBrptbeONQkaKijoqqFUewDkKDEohBPxNIkyLJG8siFHAZcxwEDIPiGjrVr3TRbWs3+DbeJJdjFFSNEDOB6O7GAx8s1IrptuG3iGMPndu7td27zzjOfXXbQYDe8ScRxZ76Z4z+nFaofqZM1HHtB1j/XD/MW/wD4q1/j3geDUAGLGOdRhZQoOV+Y68ty8+XMEefUHIbTga5fUXsNyq0Y3NJscpswpDgdTndgesEZ5UHTpHGWvzyCO3neWTG7YtvB0BGSfxYwvMZOR1rfbEyGNDKAHKrvA6B8DcB6s5qA4H4Pt9PjIjy8j47yUgAtjooA+Kg8vrJqz0ClKUClKUClKUClKUHNqF2kUTyyHCRozsfJVBJP1CqFo+hS6qou9TdxBJ6UFmkjIixn4rylSC7sMHr4+vAt/GFp3tjcxZC74ZVBPQEocE+rNcHZ/r9vd2kRiddyRoskefSRlUAgr1xy5HoRQQWudnyQxmTR3ktZ15hVnfZJj5Lh2I6dPDzBqu8H61r2os0UV0iRRnbJciBM+oJywzkc+QGAckjlm7cfcQd3GbS1YPezgxxxqcsgfkZXxnYqjJyfLyBxKcG6FHZWkdunPaMu2Mb5Dzd/eeg8AAPCgi9J7PdNibvJY2uZSctLcMZWY+ZVvRz7s1abeBEG1EVR5KoUfUK9qUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUFa4l4OtbwkzPOMgAqlw6ocdPxZJX7KgV7I9NBz3lz/ADqD7Qma0OlBBcNcLWVkD8GhCs3xnJLufa7ZOPV0qdpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSg//Z" alt="Olea" />
                 </Link>
                 </Navbar.Brand>

                                <span className={styles.username}>{userId ? " Welcome " + Object.keys(user).length ? ` ${user.username}`  : "" + " 👋" : "Henry Barber"}</span>
                                



                            </li>
                        </ul>

                        {!!myUser?.isAdmin&&
                            <Link to="/dash"><button>ADMIN DASH</button></Link>}
                        <ul className="navbar-nav d-flex flex-row" >

                            {!!userId && <li className="nav-item me-3 me-lg-0">
                                <a>
                                    <Link to="/logout"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "1px", position: "absolute", left: "1470", top: "35" }} className="bi bi-escape" viewBox="0 0 16 16">
                                        <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z" />
                                        <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z" />
                                    </svg> </Link></a>
                            </li>}

                            {/*--------- login---------- */}
                            {!userId && <li className="nav-item me-3 me-lg-0">
                                <Link to="/login">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px", position: "absolute", left: "1430", bottom: "42"  }} className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                        <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg></Link>
                            </li>}

                            {/*--------- register---------- */}
                            {!userId && <li className="nav-item me-3 me-lg-0">
                                <Link to="/register">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px", position: "absolute", left: "1398", bottom: "42" }} className="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        <path d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></Link>

                            </li>}
                            {/*--------- back to home---------- */}


                            {location.pathname !== '/' && <li className="nav-item me-3 me-lg-0">
                                <Link to="/" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px", position: "absolute", left: "1360", bottom: "42" }} className="bi bi-house-door" viewBox="0 0 16 16">
                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                    </svg></Link>

                            </li>}
                            <li className="nav-item me-3 me-lg-0 dropdown">

                                <Link to="/cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" style={{ margin: "10px", position: "absolute", left: "1080", bottom: "-30" }} className="bi bi-cart-check" viewBox="0 0 16 16">
                                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    <h5 style={{ margin: "-35px 0px 0px 1180px", color: "white" }}>{cartItems.length}</h5>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav >
                </Navbar>
            </div >

        )
    }
}