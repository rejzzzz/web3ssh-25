


export default function Layout({children}:{children:React.ReactNode}){
       return(
          <html lang="en">
            <body style={{background:"linear-gradient(135deg, #1a1a40, #2e2e5e)"}}>
                
                {children}
            </body>
            </html>
       );
}