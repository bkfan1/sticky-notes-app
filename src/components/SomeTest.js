import ReactMarkdown from "react-markdown";

let some = `# A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export default function SomeTest(){
    return(
        <>
        <ReactMarkdown children={some}>
        </ReactMarkdown>
        </>
    )
}