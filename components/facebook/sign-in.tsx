
"use client"
import { signIn } from "next-auth/react"

export default function FacebookSignIn() {
    return <button onClick={() => signIn("facebook")}>Facebook sign in</button>
}
