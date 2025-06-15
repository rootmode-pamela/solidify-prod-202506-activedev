public class QuoteCreatePdf {

    @InvocableMethod
    public static void CreateQuoteDoc(List<Id> quoteIds){
        createQuoteDocFuture(quoteIds);
    }
    
    @future(callout=true)
    public static void createQuoteDocFuture(List<Id> quoteIds){
        String quoteUrl = Site.getBaseUrl()+ '/quote/quoteTemplateDataViewer.apexp?resizeAutomatically=true&';
        String quoteTemplateId = Label.QuoteTemplateId;
        List<QuoteDocument> lstQuoteDoc = new List<QuoteDocument>();
        
        if(!quoteIds.isEmpty() && quoteIds.size()>0){
            
            for(Id quoteId : quoteIds){
                quoteURL += 'id='+quoteId;
                quoteURL += '&summlid=' + quoteTemplateId;
                quoteURL += '&headerHeight=377&footerHeight=150';

            
            PageReference pageRef = new PageReference(quoteUrl);
            Blob quoteBlob;
            
            if(Test.isRunningTEst()){
                quoteBlob = Blob.valueOf('Generated Pdf');
            } else {
                system.debug(pageRef.getURL());
                quoteBlob = pageRef.getContentAsPdf();
            }
            
            QuoteDocument quoteDoc = new QuoteDocument();
            quoteDoc.Document = quoteBlob;
            quoteDoc.QuoteId = quoteId;
            lstQuoteDoc.add(quoteDoc);
        }

    	if(!lstQuoteDoc.isEmpty() && lstQuoteDoc.size()>0){
        	Database.insert(lstQuoteDoc);
    	}
    }
	}
}