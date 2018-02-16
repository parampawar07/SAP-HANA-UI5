
function escape(v1)
{
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return v2;
}
$.response.contentType = "text/html";
try
{
          var conn = $.db.getConnection();
          var filename = $.request.parameters.get("file_name");
          var pstmtTime = conn.prepareStatement( "select UTCTOLOCAL(CURRENT_UTCTIMESTAMP,'EST') from dummy");
          var rs = pstmtTime.executeQuery();
          var batchTimestamp;
          if (rs.next())
          {
                    batchTimestamp = rs.getTimestamp(1);
          }
          var batchId = filename+"_"+batchTimestamp;
              var pstmt = conn.prepareStatement( "insert into MURPHP11.\"gbi-student-004::MY_FILE_UPLOAD_TABLE\" (CRIME_ABBR) " +
                                                                                                    "values(?,?)" );
          if($.request.entities.length>0){
                    var file_body = $.request.entities[0].body.asString();
                    var allTextLines = file_body.split(/\r\n|\n/);
                    var lines;
                    var entries;
                    var col;
                    pstmt.setBatchSize(allTextLines.length-1);
                    for (lines=0; lines<allTextLines.length; lines++)
                    {
                              entries = allTextLines[lines].split(',');
                              col = entries.splice(0,allTextLines.length);
                              if ( col[0].length > 0 )
                              {
                                        col[0] = escape(col[0]);
                                        pstmt.setString(1,batchId);
                                        pstmt.setString(2,col[0]);
                                        pstmt.addBatch();
                              }
                    }
                    pstmt.executeBatch();
          }
          else
          {
                    $.response.setBody("No Entries");
          }
          pstmt.close();
          conn.commit();
          conn.close();
          $.response.setBody("[200]:Upload successful!");
}
catch(err)
{
          if (pstmt !== null)
          {
                    pstmt.close();
          }
          if (conn !== null)
          {
                    conn.close();
          }
          $.response.setBody(err.message);
}