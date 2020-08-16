// 解决的问题
// 1. 首先判断`hasText()`；如果说开头是一个`\u200B`字符的话，很大程度就是为了inlineStyle
// 2. toggleInlineStyle 和 `blockStyle`
// 3. 对atomic entity怎么处理？

// https://github.com/facebook/draft-js/blob/master/examples/draft-0-9-1/rich/rich.html#L52
// https://github.com/facebook/draft-js/blob/master/src/model/modifier/RichTextEditorUtil.js#L54
import { RichUtils, EditorState, DraftEditorCommand } from 'draft-js';
import { GetEditor } from '../types';

// @ts-ignore
import NestedRichTextEditorUtil from 'draft-js/lib/NestedRichTextEditorUtil'

function DefaultHandleKeyCommandPlugin() {
  this.apply = (getEditor: GetEditor) => {
    const { hooks } = getEditor();
    hooks.handleKeyCommand.tap(
      'HandleBackspaceOnStartOfBlockPlugin',
      (command: DraftEditorCommand, editorState: EditorState) => {
        console.log('handle ', editorState.getCurrentContent().getBlockMap().toJS(), command)

        // https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/playground/src/DraftJsRichEditorExample.js#L26
        const newState = NestedRichTextEditorUtil.handleKeyCommand(editorState, command);
        if (newState) {
          console.log('state -----', editorState.getSelection().toJS())
          hooks.setState.call(newState);
          return 'handled';
        }
        return ;
      }
    );
  };
}

export default DefaultHandleKeyCommandPlugin;
