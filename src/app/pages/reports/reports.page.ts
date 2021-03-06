import { Printer , PrintOptions} from '@ionic-native/printer/ngx';
import { Storage } from '@ionic/storage';
import { Util } from './../../services/util';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PdfDTO } from './../../api/models/pdf-dto';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {


  pdf: PdfDTO = {};
  user;
  loader: HTMLIonLoadingElement;

  constructor(
    private query: QueryResourceService,
    private file: File,
    private fileOpener: FileOpener,
    private util: Util,
    private storage: Storage,
    private printer: Printer,
    private platform: Platform
  ) { }

  ngOnInit() {
      this.storage.get('user').then(user => {
        this.user = user;
      });

  }

  getReports(report) {
    this.util.createLoader().then(loader => {
      this.loader = loader;
      this.loader.present();
      if (report === 'pro') {
          this.query.getAllProductsByIdpCodeUsingGET(this.user.preferred_username).subscribe(proPdf => {
            this.pdf = proPdf;
            console.log(this.pdf);
            this.exportPdf();
          }, err => {
            console.log(err);
          });
        } else if (report === 'cat') {
          this.query.getAllCategoriesByIdpCodeUsingGET(this.user.preferred_username).subscribe(catPdf => {
            this.pdf = catPdf;
            console.log(this.pdf);
            this.exportPdf();
          }, err => {
            console.log(err);
          });
        } else if (report === 'sc') {
          this.query.getCurrentStockByIdpCodeUsingGET(this.user.preferred_username).subscribe(scPdf => {
            this.pdf = scPdf;
            console.log(this.pdf);
            this.exportPdf();
          }, err => {
            console.log(err);
          });
        }
    });

    }

exportPdf() {
        const byteCharacters = atob(this.pdf.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: this.pdf.contentType });
        console.log('blob is' + blob);
        if (this.platform.is('android')) {
          console.log('platform is android***********');
          this.fileCreation(blob, this.pdf);
        } else {
          console.log('platform is browser***********');
          let pdfResult = this.pdf.pdf;
          let dataURI = 'data:application/pdf;base64,' + pdfResult;
          let win = window.open();
          win.document.write('<iframe src="' + dataURI  + '"  style="position: absolute; height: 100%; border: none " ></iframe>');
        }
        this.loader.dismiss();
  }
fileCreation(blob, result) {
    const res = this.file.createFile(this.file.externalCacheDirectory, 'items.pdf', true);
    if (res !== undefined) {
        res
      .then(() => {
        console.log('file created' + blob);

        this.file
          .writeFile(this.file.externalCacheDirectory, 'items.pdf', blob, {
            replace: true
          })
          .then(value => {
            const options: PrintOptions = {
              name: 'MyDocument'
            };
            console.log('file writed' + value);
            this.printer.print(this.file.externalCacheDirectory + 'items.pdf', options).then();
            // this.fileOpener
            //   .showOpenWithDialog(
            //     this.file.externalCacheDirectory + 'items.pdf',
            //     result.contentType
            //   )
            //   .then(() => console.log('File is opened'))
            //   .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
    }
  }



}
