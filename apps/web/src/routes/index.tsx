import { createFileRoute } from "@tanstack/react-router"
import { NfcOfflineScheduleTest } from "@/components/nfc-offline-schedule-test"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NFC Offline Schedule Test" },
      {
        name: "description",
        content: "A local-only iPhone NFC and offline PWA schedule test.",
      },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "NFC Schedule" },
    ],
  }),
  component: NfcOfflineScheduleTest,
})
