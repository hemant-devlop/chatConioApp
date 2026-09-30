
export const SvgEyeClose = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className={className} viewBox="0 0 12 12">
      <path d="M0 0h12v12H0z" fill="none" />
      <path fill="currentColor" d="M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a2 2 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.165-.31.422-.723.801-1.136C2.834 3.827 4.087 3 6 3s3.166.827 3.931 1.662a5.5 5.5 0 0 1 .98 1.517l.046.113c.003.008.013.06.023.11L11 6.5s.084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.006-.016l-.031-.078a4.5 4.5 0 0 0-.795-1.226C8.584 4.674 7.587 4 6 4s-2.584.673-3.194 1.338a4.5 4.5 0 0 0-.795 1.225l-.03.078zM4 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
    </svg>

  )
}

export const SvgEyeOpen = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className={className} viewBox="0 0 12 12">
      <path d="M0 0h12v12H0z" fill="none" />
      <path fill="currentColor" d="M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a2 2 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.165-.31.422-.723.801-1.136C2.834 3.827 4.087 3 6 3s3.166.827 3.931 1.662a5.5 5.5 0 0 1 .98 1.517l.046.113c.003.008.013.06.023.11L11 6.5s.084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.006-.016l-.031-.078a4.5 4.5 0 0 0-.795-1.226C8.584 4.674 7.587 4 6 4s-2.584.673-3.194 1.338a4.5 4.5 0 0 0-.795 1.225l-.03.078zM6 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4M5 7a1 1 0 1 1 2 0a1 1 0 0 1-2 0" />
    </svg>

  )
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 4.5c0-.6.4-1 1-1H8c.5 0 1 .4 1.1.9l.9 3.6c.1.4 0 .9-.3 1.2L8.2 10.7a13 13 0 0 0 5.1 5.1l1.5-1.5c.3-.3.8-.4 1.2-.3l3.6.9c.5.1.9.6.9 1.1v3.5c0 .6-.4 1-1 1C10.9 20.5 3.5 13.1 3.5 4.5Z" />
    </svg>
  );
}

export function VideoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10.5 21 7v10l-6-3.5" />
    </svg>
  );
}

export function InfoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function ChatBubbleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export const SvgBack = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
      <path d="M0 0h2048v2048H0z" fill="none" />
      <path fill="#929292" d="M2048 1088H250l787 787l-90 90L6 1024L947 83l90 90l-787 787h1798z" />
    </svg>


  )
}
