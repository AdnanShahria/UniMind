import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from the root .dev.vars file
const env = dotenv.config({ path: '../.dev.vars' }).parsed || {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
