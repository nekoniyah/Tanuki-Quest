import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com', // Replace with your SMTP host
	port: 587, // Replace with your SMTP port
	auth: {
		user: 'contact.velvetdream@gmail.com', // Use environment variable for security
		pass: process.env.MAIL_PW // Use environment variable for security
	}
});
export async function sendVerificationEmail(email: string, code: string) {
	const mailOptions = {
		from: process.env.MAIL_USER, // Replace with your email
		to: email,
		subject: 'Verification Code',
		text: `Your verification code is: ${code}`
	};
	await transporter.sendMail(mailOptions);
}
