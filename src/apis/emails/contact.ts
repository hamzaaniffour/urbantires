import nodemailer from 'nodemailer';

export default async function handler(req: { method: string; body: { firstName: any; lastName: any; email: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, message } = req.body;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your password or app-specific password
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com', // Replace with the recipient's email
        subject: 'New Contact Form Submission',
        text: `
          First Name: ${firstName}
          Last Name: ${lastName}
          Email: ${email}
          Message: ${message}
        `,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}