import {
  IconAntennaBars5,
  IconBook2,
  IconCheck,
  IconCloudOff,
  IconDeviceMobile,
  IconRefresh,
  IconTrash,
  IconWifi,
  IconWifiOff,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

const STORAGE_KEY = "helbi-nfc-offline-schedule"

type Schedule = {
  subject: string
  day: string
  startTime: string
  endTime: string
  room: string
}

type WorkerStatus = "checking" | "installing" | "ready" | "unsupported" | "error"

const SAMPLE_SCHEDULE: Schedule = {
  subject: "Mobile Application Development",
  day: "Monday",
  startTime: "09:00",
  endTime: "10:30",
  room: "Computer Lab 2",
}

const WORKER_STATUS_LABELS: Record<WorkerStatus, string> = {
  checking: "Checking…",
  installing: "Installing cache…",
  ready: "Ready for offline use",
  unsupported: "Not supported",
  error: "Registration failed",
}

function getDisplayMode() {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))

  return isStandalone ? "Standalone app" : "Safari browser"
}

function StatusItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-white/10 py-3 last:border-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/5 text-zinc-300">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{label}</p>
        <p className="truncate text-sm font-medium text-zinc-100">{value}</p>
      </div>
    </div>
  )
}

export function NfcOfflineScheduleTest() {
  const [schedule, setSchedule] = useState<Schedule>(SAMPLE_SCHEDULE)
  const [isOnline, setIsOnline] = useState(true)
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus>("checking")
  const [displayMode, setDisplayMode] = useState("Browser")
  const [saveMessage, setSaveMessage] = useState("Sample schedule ready to save")

  useEffect(() => {
    setIsOnline(window.navigator.onLine)
    setDisplayMode(getDisplayMode())

    const savedSchedule = window.localStorage.getItem(STORAGE_KEY)
    if (savedSchedule) {
      try {
        setSchedule(JSON.parse(savedSchedule) as Schedule)
        setSaveMessage("Saved schedule loaded from this device")
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
        setSaveMessage("Sample schedule ready to save")
      }
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    if (!("serviceWorker" in navigator)) {
      setWorkerStatus("unsupported")
      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }

    let isMounted = true
    const updateWorkerStatus = (registration: ServiceWorkerRegistration) => {
      if (!isMounted) return
      if (navigator.serviceWorker.controller || registration.active) {
        setWorkerStatus("ready")
      } else {
        setWorkerStatus("installing")
      }
    }

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        updateWorkerStatus(registration)
        registration.addEventListener("updatefound", () => {
          if (isMounted) setWorkerStatus("installing")
          registration.installing?.addEventListener("statechange", () => {
            updateWorkerStatus(registration)
          })
        })
      })
      .catch(() => {
        if (isMounted) setWorkerStatus("error")
      })

    const handleControllerChange = () => {
      if (isMounted) setWorkerStatus("ready")
    }
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange)

    return () => {
      isMounted = false
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange)
    }
  }, [])

  const updateField = (field: keyof Schedule, value: string) => {
    setSchedule((current) => ({ ...current, [field]: value }))
    setSaveMessage("Unsaved changes")
  }

  const saveSchedule = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
    setSaveMessage("Schedule saved on this device")
  }

  const clearSchedule = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setSchedule({ subject: "", day: "", startTime: "", endTime: "", room: "" })
    setSaveMessage("Saved schedule cleared")
  }

  return (
    <main className="min-h-dvh bg-[#0a0a0a] text-zinc-100 selection:bg-lime-300 selection:text-black">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <header className="border-b border-white/10 pb-6 sm:pb-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
              <IconAntennaBars5 aria-hidden="true" className="size-5 text-lime-300" />
              Physical device experiment
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-semibold tracking-wider text-zinc-400 uppercase">
              Local only
            </span>
          </div>
          <h1 className="max-w-3xl font-heading text-4xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl">
            NFC Offline Schedule Test
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Save one class schedule on this device, then use an NFC tag to test whether Safari can
            reopen the cached page without a connection.
          </p>
        </header>

        {!isOnline && (
          <div
            className="mt-5 flex items-center justify-center gap-2 border border-amber-300/40 bg-amber-300 px-4 py-3 text-sm font-black tracking-[0.2em] text-black uppercase"
            role="status"
          >
            <IconCloudOff aria-hidden="true" className="size-5" />
            Offline mode
          </div>
        )}

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="border border-white/10 bg-zinc-950 p-4 sm:p-5" aria-labelledby="device-status-heading">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-lime-300 uppercase">System check</p>
                <h2 id="device-status-heading" className="mt-1 text-lg font-semibold text-white">
                  Device status
                </h2>
              </div>
              <span
                className={`size-2.5 rounded-full ${isOnline ? "bg-lime-300" : "bg-amber-300"}`}
                aria-hidden="true"
              />
            </div>
            <div className="pt-1">
              <StatusItem
                label="Connection"
                value={isOnline ? "Online" : "Offline"}
                icon={isOnline ? <IconWifi className="size-5" /> : <IconWifiOff className="size-5" />}
              />
              <StatusItem
                label="Service worker"
                value={WORKER_STATUS_LABELS[workerStatus]}
                icon={<IconRefresh className={`size-5 ${workerStatus === "installing" ? "animate-spin" : ""}`} />}
              />
              <StatusItem
                label="Display mode"
                value={displayMode}
                icon={<IconDeviceMobile className="size-5" />}
              />
            </div>
          </section>

          <section className="border border-white/10 bg-zinc-950 p-4 sm:p-5" aria-labelledby="schedule-heading">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-lime-300 uppercase">Stored on device</p>
                <h2 id="schedule-heading" className="mt-1 text-lg font-semibold text-white">
                  Student schedule
                </h2>
              </div>
              <IconBook2 aria-hidden="true" className="size-6 text-zinc-500" />
            </div>

            <form
              className="mt-5 grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault()
                saveSchedule()
              }}
            >
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-zinc-400">Subject</span>
                <input
                  className="min-h-11 rounded-md border border-white/15 bg-black px-3 text-base text-white outline-none transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                  value={schedule.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder="e.g. Mobile Application Development"
                />
              </label>
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-zinc-400">Day</span>
                <input
                  className="min-h-11 rounded-md border border-white/15 bg-black px-3 text-base text-white outline-none transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                  value={schedule.day}
                  onChange={(event) => updateField("day", event.target.value)}
                  placeholder="e.g. Monday"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-400">Start time</span>
                <input
                  type="time"
                  className="min-h-11 rounded-md border border-white/15 bg-black px-3 text-base text-white outline-none transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                  value={schedule.startTime}
                  onChange={(event) => updateField("startTime", event.target.value)}
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-400">End time</span>
                <input
                  type="time"
                  className="min-h-11 rounded-md border border-white/15 bg-black px-3 text-base text-white outline-none transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                  value={schedule.endTime}
                  onChange={(event) => updateField("endTime", event.target.value)}
                />
              </label>
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-zinc-400">Room</span>
                <input
                  className="min-h-11 rounded-md border border-white/15 bg-black px-3 text-base text-white outline-none transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                  value={schedule.room}
                  onChange={(event) => updateField("room", event.target.value)}
                  placeholder="e.g. Computer Lab 2"
                />
              </label>

              <p className="min-h-5 text-xs text-zinc-500 sm:col-span-2" role="status" aria-live="polite">
                {saveMessage}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-lime-300 px-4 text-sm font-bold text-black transition hover:bg-lime-200 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <IconCheck aria-hidden="true" className="size-5" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={clearSchedule}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <IconTrash aria-hidden="true" className="size-5" />
                  Clear
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mt-5 border border-white/10 bg-zinc-950 p-4 sm:p-6" aria-labelledby="test-steps-heading">
          <p className="text-xs font-semibold tracking-[0.16em] text-lime-300 uppercase">Physical iPhone test</p>
          <h2 id="test-steps-heading" className="mt-1 text-lg font-semibold text-white">
            Test steps
          </h2>
          <ol className="mt-5 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              <>Open <span className="font-medium text-white">https://rald.site/</span> in Safari while online.</>,
              <>Save a sample schedule.</>,
              <>Reload once.</>,
              <>Optionally add it to the Home Screen.</>,
              <>Close Safari.</>,
              <>Turn on Airplane Mode.</>,
              <>Tap an NFC tag programmed with <span className="font-medium text-white">https://rald.site/</span>.</>,
              <>Tap the NFC notification.</>,
              <>Confirm the schedule and <span className="font-bold text-amber-300">OFFLINE MODE</span> appear.</>,
            ].map((step, index) => (
              <li key={index} className="flex gap-3 bg-zinc-950 p-4 text-sm leading-6 text-zinc-400">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/15 text-xs font-semibold text-zinc-300">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            This page stores data only in this browser. Clearing Safari website data removes both the schedule and offline cache.
          </p>
        </section>
      </div>
    </main>
  )
}
