import React from 'react';

import NavBar from 'components/navbar';

import './legal.scss';

const PrivacyPolicy = () => (
  <div>
    <NavBar />
    <div className="Legal container col-md-8 offset-md-2">
      <h1>Papernet Privacy Policy</h1>
      <h6>Effective date: 2017/02/20</h6>

      <h2>General Information</h2>
      <p>
        This policy sets out our privacy practices and explains how we handle the information collected
        when you visit and use the papernet web site papernet.bobi.space: &quot;Papernet&quot;.
      </p>

      <h2>What we collect</h2>
      <p>
        We collect information about what pages you access and information about your device (such as the Operating
        System or your browser type).

        Like most websites, our servers automatically record each request made when someone visits Papernet. These
        server logs may include your web request, IP address, browser type, browser language, the date and time of
        your request, and one or more cookies that may uniquely identify your browser.
      </p>
      <p>
        When you create your Papernet account via Google, we collect:
      </p>
      <ul>
        <li>your Google ID: to uniquely identify you</li>
        <li>your first name and last name: to display it on the navigation bar, so you can see you are
        logged in (and in case you forget your name, you have it there)</li>
        <li>your email: it is sent back to us by Google when you are authenticating, but we do not store it
        anywher, so it is like we never got it in the first place.</li>
      </ul>

      <h2>Emails from Papernet</h2>
      <p>As stated above, we do not store your email address, so we will not be sending you any email. If you
      receive any mail from Papernet, it is actually someone pretending to be Papernet so please report it to us.
      </p>

      <h2>Disclosure of your information</h2>
      <p>
        We do not do anything with your personal information, like litterally nothing. We do not sell it, we do
        not share it, and we do not use it.
      </p>
      <p>
        When we will start using your data in Papernet you will be notified. Your data will be used to personalize
        your experience on the website, probably with recommendation. However, your name will never be exposed.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies to recognize you when you return to Papernet. We use them to log you in. Because you need to
        be logged in to use Papernet, there will be a Papernet cookie on your browser as long as you are logged in.
        We do not use cookies for anything else than keeping you logged in.
      </p>
      <p>
        If you want to remove the cookies from Papernet, please search on the Internet how to do that.
      </p>

      <h2>Data security</h2>
      <p>
        We use encryption (HTTPS/TLS) to protect data transmitted to and from our site. However, no data
        transmission over the Internet is 100% secure, so we can’t guarantee security. You use Papernet at your
        own risk, and you’re responsible for taking reasonable measures to secure your account.
      </p>

      <h2>Changes to this Policy</h2>
      <p>
        We may periodically update this Policy. We’ll notify you about significant changes to it.
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
