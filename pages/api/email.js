import { Resend } from 'resend'
import EmailTemplate from '../../components/EmailTemplate'
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'throwException.dev <website@throwException.dev>',
      to: 'hello@throwexception.dev',
      replyTo: data.email,
      subject: `${data.name} - via throwException.dev`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
