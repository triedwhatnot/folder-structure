import { files } from './data';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className='border-white border-[1px] p-2 w-[200px]'>
      <RenderFolder file={files} />
    </div>
  )
}

export default App;



const RenderFolder = ({file}) => {
  return (
    file.isFolder && file.children.length 
    ?
      <Accordion text={file.name} childFiles={file.children} /> 
    :
      <Header text={file.name} />
  )
}

const Accordion = ({text, childFiles}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsOpen(isOpen => !isOpen);
  }

  return (
    <>
      <Header clickHandler={handleAccordionToggle} text={text} isOpen={isOpen} />
      {
        isOpen && 
        <div className='pl-5'>
          {
            childFiles.map((file, idx) => {
              return (<RenderFolder key={idx} file={file} />)
            })
          }
        </div>
      }
    </>
  )
}

const Header = ({text, clickHandler, isOpen}) => {

  return (
    <div {...(clickHandler ? {onClick: clickHandler} : {})} className={`flex items-center ${clickHandler ? "cursor-pointer" : "cursor-default"}`}>
      <span className={`w-5 ${isOpen ? "rotate-90" : ""}`}>{clickHandler ? "> " : ""}</span>
      <img src={getIcon(text)} className={"h-4 pr-1"} />
      <span>{text}</span>
    </div>
  )
}

function getIcon(fileName){
  if (fileName.endsWith(".js")) {
    return "https://cdn-icons-png.flaticon.com/512/4726/4726005.png";
  } else if (fileName.endsWith(".css")) {
    return "https://cdn-icons-png.flaticon.com/512/2656/2656408.png";
  } else if (fileName.endsWith(".html")) {
    return "https://cdn-icons-png.flaticon.com/512/4248/4248142.png";
  } else if (fileName.endsWith(".json")) {
    return "https://png.pngtree.com/png-clipart/20190630/original/pngtree-json-file-document-icon-png-image_4166911.jpg";
  } else {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6e9gT1k_B9JJELZl7PMJfihTg1S5sIfBlw&s";
  }
}


/*
  expandable : accordion
    - arrow + icon + name
  non expandable : name
    - icon + name


    renderFolder(fileObj)
      - isFolder && children.length ? <Accordion>{children.forEach(renderFolder)}</Accordion> : <Filename />
*/