"use server"

import { signIn } from "@/auth"
import { query } from "@/lib/db"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export async function googleSignIn() {
    await signIn("google")
}

export async function credentialsAction(email, password) {

    if(!email || !password) {
        return {message: "Invalid details, please try again later"}
    }

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    try {
        await signIn("credentials", formData);
    } catch (err) {
        return {message: "Invalid details, please try again later"}
    }
}

export async function FirstSignup(email) {

    if (!email) {
        return { message: "Please input an email address" }
    }

    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    try {

        const checkUserQuery = "SELECT * FROM users WHERE email = $1";
        const existingUser = await query(checkUserQuery, [email]);

        if (existingUser.rows.length > 0) {
            return { message: "Email already exists, please use a different email" };
        }

        const { success } = await sendVerificationEmail(email, pin)

        if (!success) {
            throw new Error("couldn't send mail")
        }

        const date = new Date()

        const queryText = "INSERT INTO verify_email(email, pin, date) VALUES($1, $2, $3)";
        await query(queryText, [email, pin, date])

        return { success: true, message: "A one-time password has been sent to your email address" }

    } catch (error) {
        return { message: "Server error, please try again later" }
    }
}

export async function otpVerification(email, pin, deletStatus) {

    let queryText
    let result;

    if (!deletStatus && (!email || !pin)) {
        return { message: "Please input your OTP and email" };
    }
    else {
        if (!email || !pin) {
            return { message: "Please input your OTP and email" }
        }
    }

    try {
        if (deletStatus) {
            queryText = "SELECT * FROM verify_email WHERE pin = $1 ORDER BY date DESC LIMIT 1";
            result = await query(queryText, [pin]);
        }
        else {
            queryText = "SELECT * FROM verify_email WHERE email = $1 ORDER BY date DESC LIMIT 1";
            result = await query(queryText, [email]);
        }

        const latestRecord = result.rows[0];

        if (!latestRecord) {
            return { message: "Invalid email or OTP" };
        }

        const previous_time = new Date(latestRecord.date).getTime();
        const current_time = new Date().getTime();
        const expiry_duration = 15 * 60 * 1000;
        const token_duration = current_time - previous_time;

        if (token_duration > expiry_duration) {
            return { message: "OTP has expired, please request a new one" };
        }

        if (latestRecord.pin !== pin) {
            return { message: "Invalid OTP, please try again" };
        }

        if (deletStatus) {
            return { success: true, message: latestRecord.email };
        }

        return { success: true, message: "OTP verified successfully" };
    } catch (error) {
        return { message: "Server error, please try again later" };
    }

}

export async function ContinueSignup(name, email, password, confirm_password) {

    if (!name || !email || !password || !confirm_password) {
        return { message: "Empty fields, please fill in the blank fields" }
    }

    if (password !== confirm_password) {
        return { message: "Your passwords do not match" }
    }

    if (password.length < 8) {
        return { message: "Password must be up to 8 characters" }
    }

    try {

        const checkUserQuery = "SELECT * FROM users WHERE email = $1";
        const existingUser = await query(checkUserQuery, [email]);

        if (existingUser.rows.length > 0) {
            return { message: "Email already exists, please use a different email" };
        }

        const password_hash = bcrypt.hashSync(password, 10);

        const deleteQuery = "DELETE FROM verify_email WHERE email = $1";
        await query(deleteQuery, [email]);

        const insertUserQuery = "INSERT INTO users(name, email, password) VALUES($1, $2, $3)";
        await query(insertUserQuery, [name, email, password_hash]);

        return { success: true, message: "Registration successful, proceed to login ..." }
    } catch (error) {
        console.log(error)
        return { message: "Server error, please try again later" }
    }
}

async function sendVerificationEmail(email, pin) {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "One-Time Email Verification From Fiuzar",
        html: `        
            <h1 style="text-align: center;">Email Verification from Fiuzar</h1>
            <p style="padding: 10px;">Enter the code below to verify your email address and continue with your verification. You can ignore the email if you didn't request the OTP</p>
            <h2 style="font-weight: 800; text-align: center; margin: 20px 0px;">${pin}</h2>           
            <p style="padding: 10px; color: red;">This OTP is valid for 15 minutes. Please don't share this code with anyone</p>
            
            <div style="padding: 10px;">
                <b>Need Help?</b> <br/>
                <a href="mailto:${process.env.SITE_URL}">mail@fiuzar.com</a>
            </div>`
    }

    try {

        await transport.sendMail(mailOptions)
        return { success: true }

    } catch (error) {
        return { success: false }
    }
}