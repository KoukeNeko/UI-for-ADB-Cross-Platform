import React from 'react'

export default function Log() {
  return (
    <>
      <div className="App">
        <header className="App-header">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              height: '90vh',
              width: '90%',
              gap: "20px",
            //   paddingTop: "70px",
              // backgroundColor: 'rgba(255,255,255,0.5)',
            }}>
              <div>
                <h1>Log</h1>
              </div>
              <div style={{
                marginTop: '35px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                overflow: 'hidden',
                // overflowY: 'scroll'
              }}>
                {
                    JSON.parse(localStorage.getItem("log")).map((log, index) => {
                        return (
                            <div style={{
                                height: '40px',
                                width: '95%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#243b4a',
                                borderRadius: '15px',
                                paddingLeft: '15px',
                                userSelect: 'text',
                            }}>
                               {log}
                            </div>
                        )
                    })
                }
              </div>
            </div>
        </header>
      </div>
    </>
  );
}
