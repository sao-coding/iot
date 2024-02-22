import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"

import Form from "./form"
const SettingsPage = async () => {
  const session = await getServerSession(authOptions)
  console.log("session", session)
  return (
    <div>
      <h1>Settings</h1>
      {session && <Form user={session.user} />}
    </div>
  )
}
export default SettingsPage
