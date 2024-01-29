const OneQuery = ({ boldedPartBefore, normalText, boldedPartAfter , query, setQuery }) => {
    

    const handleClick = () => {
      setQuery(`${boldedPartBefore}${normalText}${boldedPartAfter}`);
    };

    return (
      <tr  onClick={handleClick}>
        <td
          style={{
            maxWidth: "300px",
            height: "auto",
            wordWrap: "break-word",
            textAlign: "start",
            cursor: 'pointer'
          }}
        >
          <span style={{ fontWeight: "bold" }}>{boldedPartBefore}</span>{normalText}<span style={{ fontWeight: "bold" }}>{boldedPartAfter}</span>
        </td>
      </tr>
    );
  };

  export default OneQuery;