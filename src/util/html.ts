export const clean = (html : string) => {
  let content = html.trim();
  content = removeSuffix(content, '<div></div>');
  content = removeSuffix(content, '<p></p>');
  content = removeSuffix(content, '<div><br/></div>');
  content = removeSuffix(content, '<div><br></div>');
  content = removeSuffix(content, '<br/>');
  content = removeSuffix(content, '<br/><br/>');
  return content;
};

const removeSuffix = (content : string, suffix : string) => {
  if (!content.endsWith(suffix)) return content;
  return content.substring(0, content.length - suffix.length);
};

export const htmlToText = (content? : string) => {
  if (!content) return '';
  return content
    .replace(/\r/g, '\n')
    .replace(/<br\/>/g, '\n')
    .replace(/<br \/>/g, '\n')
    .replace(/<br>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/p>/g, '\n')
    .replace(/^(\s*\n){2,}/g, '\n')
    .replace(/(<([^>]+)>)/ig, '')
    .trim()
    .replace(/\n/g, '\r\n');
};
