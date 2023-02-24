import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <div>
          <label>Username </label>
          <input type="text" name="name" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}
