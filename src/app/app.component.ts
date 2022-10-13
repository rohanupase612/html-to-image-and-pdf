import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'html-to-png';
  captureData(){
    var data = <HTMLImageElement>document.getElementById("convertpng");
    html2canvas(data).then(function(canvas){
      var imagegenerated = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
      window.location.href = imagegenerated ;
    })
  }
  public convertpdf(){
    var data = <HTMLImageElement>document.getElementById("convertpng");
    html2canvas(data).then(canvas =>{
      var imgwidth = 208;
      var pageheight = 295;
      var imgheight = canvas.height * imgwidth / canvas.width;
      var heightleft =imgheight;

      const contentDataURL = canvas.toDataURL('image/png')
      var doc = new jspdf('p', 'mm');
      var position = 0;
      
      doc.addImage(contentDataURL, 'PNG', 0, position, imgwidth, imgheight);
      heightleft -= pageheight;
      
      while (heightleft >= 0) {
        position = heightleft - imgheight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgwidth, imgheight);
        heightleft -= pageheight;
      }
      doc.save( 'file.pdf'); // Generated PDF

    })
  }
}
