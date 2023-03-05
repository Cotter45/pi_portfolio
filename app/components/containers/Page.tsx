import { motion } from "framer-motion"

export default function PageContainer({
  children,
  classes
}: { 
  children: React.ReactNode
  classes?: string
}) {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 , scale: 0.9}}
      transition={{ duration: 0.4 }}
      className="relative w-full h-[calc(100%-4rem)] min-h-[calc(100%-4rem)] flex flex-col z-10 overflow-y-auto"
    >
      <div className={`h-full w-full z-10 flex flex-col items-center ${classes}`}>
        {children}
      </div>
    </motion.main>
  )
}