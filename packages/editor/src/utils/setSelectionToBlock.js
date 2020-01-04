import { SelectionState, EditorState } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';

// Set selection of editor to next/previous block
export default (editorState, contentBlock) => {
  const blockKey = contentBlock.getKey()
  // TODO verify that always a key-0-0 exists
  const offsetKey = DraftOffsetKey.encode(blockKey, 0, 0);
  const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
  // set the native selection to the node so the caret is not in the text and
  // the selectionState matches the native selection
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, 0);
  selection.removeAllRanges();
  selection.addRange(range);

  console.log('set block key : ', blockKey)
  return EditorState.forceSelection(
    editorState,
    new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0,
      isBackward: false,
    })
  )
};
