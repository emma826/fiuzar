"use server"

import { signIn } from "@/auth"
import { query } from "@/lib/db"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export async function credentialsAction(formData) {
    await signIn("credentials", formData)
}

export async function FirstSignup(email) {
    
    if (!email) {
        return { message: "Please input an email address" }
    }

    const pin = Math.floor(10000 + Math.random() * 90000).toString();

    try {
        const { success } = await sendVerificationEmail(email, pin)

        if (!success) {
            throw new Error("couldn't send mail")
        }

        const queryText = "INSERT INTO verify_email(email, pin) VALUES($1, $2)";
        await query(queryText, [email, pin])

        return {success: true, message: "Please click on the verification link in your email to continue the registration"}

    } catch (error) {
        console.log(error)
        return { message: "Server error, please try again later" }
    }
}

export async function ContinueSignup(name, email, password, confirm_password, pin) {

    if (!name || !email || !password || !confirm_password || !pin) {
        return { message: "Empty fields, please fill in the blank fields" }
    }

    if (password !== confirm_password) {
        return { message: "Your passwords do not match" }
    }

    if (password.length < 8) {
        return { message: "Password must be up to 8 characters" }
    }

    try {
        await connectToDatabase()

        const findEmail = await verify_email.findOne({ email, pin })

        if (!findEmail.email) {
            throw new Error("server error")
        }

        const previous_time = new Date(findEmail.createdAt).getTime()
        const current_time = new Date().getTime()
        const expiry_duration = 15 * 60 * 1000
        const token_duration = current_time - previous_time

        if (token_duration > expiry_duration) {
            return { message: "verification has expired, please try again" }
        }

        const password_hash = bcrypt.hashSync(password, 10)

        // await verify_email.deleteMany({ email })
        // await user_schema.create({ name, email, password: password_hash })

        return { success: true, message: "Registration successful, proceed to login ..." }
    } catch (error) {
        console.log(error)
        return { message: "Server error, please try again later" }
    }
}

export async function CredentialsLogin(email, password) {

    await connectToDatabase()

    try {
        const findUser = await user_schema.findOne({ email })

        if (!findUser.email) {
            throw new Error({ code: 400, message: "Invalid user, please try again" })
        }

        const verify_password = bcrypt.compareSync(password, findUser.password)

        if (!verify_password) {
            throw new Error({ code: 401, message: "Invalid password, please try again later" })
        }

        return { findUser }

    } catch (error) {
        console.log(error)
        return null
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
        subject: "Email Verification From Fiuzar",
        html: `<h1>This is a link to verify your email<h1> <a href="${process.env.WEBSITE_ADDRESS}/verify-user-email?email=${email}&pin=${pin}">${process.env.WEBSITEADDRESS}/verify-user-email?email=${email}&pin=${pin}</a></h1>`
    }

    try {

        await transport.sendMail(mailOptions)
        return { success: true }

    } catch (error) {
        return { success: false }
    }
}