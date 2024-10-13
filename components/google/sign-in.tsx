
"use client"
import { signIn } from "next-auth/react"

export default function GoogleSignIn() {
    return <button onClick={() => signIn("google")} className="text-white">Sign in with Google</button>
}
