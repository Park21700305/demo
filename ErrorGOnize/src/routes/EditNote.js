import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Link,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CateDropdown from "../components/Common/CateDropdown";
import Toggle from "../components/NewNote/Toggle";

export default function EditNote() {
  const { noteNo } = useParams();
  const [writer, setWriter] = useState("EGOnize");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const getNote = async () => {
    const note = await axios.get(`http://localhost:8080/note/${noteNo}`);
    setWriter(note.data.writer);
    setCategory(note.data.category);
    setVisible(note.data.visible);
    setNoteTitle(note.data.noteTitle);
    setNoteContent(note.data.noteContent);
  };

  useEffect(() => {
    getNote();
  }, []);

  const editNote = async () => {
    await axios.patch(`http://localhost:8080/note`, {
      noteNo: `${noteNo}`,
      category: `${category}`,
      visible: `${visible}`,
      noteTitle: `${noteTitle}`,
      noteContent: `${noteContent}`,
    });
  };

  const getCate = (cate) => {
    // console.log("cate", cate);
    setCategory(cate);
  };

  const getVisi = (visi) => {
    // console.log(visi);
    setVisible(visi);
  };

  const handleTitle = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleContent = (e) => {
    setNoteContent(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <Container
      maxWidth="md"
      //   sx={{ border: "5px solid #f3f3f3", borderRadius: 5, mt: 2 }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={3}>
          <CateDropdown getCate={getCate} cate={category} />
          <Toggle getVisi={getVisi} visible={visible} />
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="warning"
            disableElevation
            onClick={() => {
              window.history.back();
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={() => {
              editNote();
              window.history.back();
            }}
          >
            수정 완료
          </Button>
        </Box>
      </Box>

      <Box>
        <InputLabel sx={{ pl: 3.5 }}>노트 제목</InputLabel>
        <TextField
          fullWidth
          sx={{ p: 3, pt: 0.5 }}
          size="small"
          value={noteTitle}
          onChange={handleTitle}
        />
        <InputLabel sx={{ pl: 3.5 }}>노트 내용</InputLabel>
        <TextField
          fullWidth
          sx={{ p: 3, pt: 0.5 }}
          multiline
          rows={19}
          size="small"
          value={noteContent}
          onChange={handleContent}
        />
      </Box>
    </Container>
  );
}
