*** Settings ***
Documentation        Test cases for ticketguru-client
Library         SeleniumLibrary   15.0   5.0

*** Variables ***
${Browser}    headlesschrome
${Sleep}    5
${URL}    http://localhost:5173
${AltURL}    http://localhost:5173/Ticketcheck

*** Test Cases ***
Open ticketcheck page
    Skip if previous fails or skips
     Open Ticketcheck
     Page Should Contain Element    id=header
     Page Should Contain Element    id=textinput
     Page Should Contain Element    id=search
     Page Should Contain Element    id=patch
     Close Browser

Open ticketguru page
    Skip If Previous Fails Or Skips
    Open Ticketguru
     Page Should Contain Element    id=eventCard
     Page Should Contain Element    id=eventInput
     Page Should Contain Element    id=ticketMenu
     Page Should Contain Element    id=adultTicket
     Page Should Contain Element    id=childrenTicket
     Page Should Contain Element    id=ticketList
     Page Should Contain Element    id=addButton
     Page Should Contain Element    id=orderButton

     Page Should Not Contain Element    id=orderCard
     Close Browser

Check ticket info 
    Skip If Previous Fails Or Skips
    Open Ticketcheck
    Wait Until Page Contains Element    id=textinput
    Wait Until Page Contains Element    id=search
    Page Should Contain Element    id=ticketInfo
    Input Text    id=textinput    1
    Click Button    id=search

    Page Should Not Contain Element    id=Error
    Wait Until Page Contains Element    id=ticketInfo

    Page Should Contain Element    id=ticketInfo
    Close Browser

Post new order
    Skip If Previous Fails Or Skips
    Open Ticketguru
    Wait Until Page Contains Element    id=eventCard
    Wait Until Page Contains Element    id=eventInput
    Page Should Not Contain Element    id=orderCard

    Click Element    id=eventSelect
    Click Element    id=eventList

    Input Text    id=adultTicket    1
    Input Text    id=childrenTicket    1

    Click Button    id=addButton
    Click Button    id=orderButton

    Page Should Contain Element    id=orderCard
    Page Should Contain Element    id=successMessage
    Close Browser

Mark ticket as used
    Skip If Previous Fails Or Skips
    Open Ticketcheck
    Wait Until Page Contains Element    id=textinput
    Wait Until Page Contains Element    id=search
    Page Should Not Contain Element    id=ticketInfo

    Input Text    id=textinput    14
    Click Button    id=search

    Wait Until Page Contains Element    id=ticketInfo
    Page Should Not Contain Element    id=Error

    Click Button    id=patch

    Alert Should Be Present    Lippua muokattu onnistuneesti
    Alert Should Not Be Present    Lipun muokkaus epäonnistui!
    Close Browser

*** Keywords ***
Open Ticketguru  
        TRY
                Open Browser    ${URL}       ${BROWSER}
                Sleep   ${Sleep}
        EXCEPT
                Fatal Error    Unable to open ${URL}.
        END

Open Ticketcheck 
        TRY
                Open Browser    ${AltURL}       ${BROWSER}
                Sleep   ${Sleep}
        EXCEPT
                Fatal Error    Unable to open ${URL}.
        END

Skip If Previous Fails Or Skips
        Skip If         '${PREV TEST STATUS}' == 'FAIL'
        Skip If         '${PREV TEST STATUS}' == 'SKIP'